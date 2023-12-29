import {
  count,
  map,
  mapObject,
  pairwise,
  pipe,
  sequence,
  split,
} from '../../../utils.js';

const first = pipe(
  split('\n'),
  map(split(' -> ')),
  map(([name, dest]) => [[name[0], name.slice(1)], dest.split(', ')]),
  (gates) => {
    const gateGrid = {};
    let low = 0,
      high = 0;
    gates.forEach(([[type, name], destList]) => {
      gateGrid[name] = {
        ...(gateGrid[name] ?? {}),
        type,
        name,
        destList,
        lastPulse: 'low',
      };

      destList.forEach((dest) => {
        gateGrid[dest] = {
          ...(gateGrid[dest] ?? {}),
          inputs: [...(gateGrid[dest]?.inputs ?? []), name],
        };
      });
    });

    Object.values(gateGrid).forEach((gate) => {
      if (gate.type === '&') {
        gate.inputs = Object.fromEntries(
          gate.inputs.map((input) => [input, 'low'])
        );
      } else {
        delete gate.inputs;
      }
    });

    sequence(1, 1000).forEach(() => {
      low++;
      const pulses = gateGrid['roadcaster'].destList.map((dest) => [
        dest,
        'low',
        'roadcaster',
      ]);

      while (pulses.length) {
        const [gateName, pulse, from] = pulses.shift();
        pulse === 'low' ? low++ : high++;
        const gate = gateGrid[gateName];

        if (!gate.name) continue;

        if (gate.type === '%') {
          if (pulse === 'low') {
            const newPulse = gate.lastPulse === 'high' ? 'low' : 'high';
            gate.lastPulse = newPulse;
            gate.destList.forEach((dest) => {
              pulses.push([dest, newPulse, gateName]);
            });
          }
        } else {
          gate.inputs[from] = pulse;
          if (Object.values(gate.inputs).every((input) => input === 'high')) {
            gate.lastPulse = 'low';
            gate.destList.forEach((dest) => {
              pulses.push([dest, 'low', gateName]);
            });
          } else {
            gate.lastPulse = 'high';
            gate.destList.forEach((dest) => {
              pulses.push([dest, 'high', gateName]);
            });
          }
        }
      }
    });

    return [high, low, high * low];
  }
);

const second = pipe(
  split('\n'),
  map(split(' -> ')),
  map(([name, dest]) => [[name[0], name.slice(1)], dest.split(', ')]),
  (gates) => {
    const gateGrid = {};
    gates.forEach(([[type, name], destList]) => {
      gateGrid[name] = {
        ...(gateGrid[name] ?? {}),
        type,
        name,
        destList,
        lastPulse: 'low',
        highPulses: new Set(),
        lowPulses: new Set(),
      };

      destList.forEach((dest) => {
        gateGrid[dest] = {
          ...(gateGrid[dest] ?? {}),
          inputs: [...(gateGrid[dest]?.inputs ?? []), name],
        };
      });
    });

    Object.values(gateGrid).forEach((gate) => {
      if (gate.type === '&') {
        gate.inputs = Object.fromEntries(
          gate.inputs.map((input) => [input, 'low'])
        );
      }
    });

    for (const buttonPresses of sequence(1, 100000)) {
      const pulses = gateGrid['roadcaster'].destList.map((dest) => [
        dest,
        'low',
        'roadcaster',
      ]);

      while (pulses.length) {
        const [gateName, pulse, from] = pulses.shift();
        pulse === 'low'
          ? gateGrid[from].lowPulses.add(buttonPresses)
          : gateGrid[from].highPulses.add(buttonPresses);
        const gate = gateGrid[gateName];

        if (!gate.name) continue;

        if (gate.type === '%') {
          if (pulse === 'low') {
            const newPulse = gate.lastPulse === 'high' ? 'low' : 'high';
            gate.lastPulse = newPulse;
            gate.destList.forEach((dest) => {
              pulses.push([dest, newPulse, gateName]);
            });
          }
        } else {
          gate.inputs[from] = pulse;
          if (Object.values(gate.inputs).every((input) => input === 'high')) {
            gate.lastPulse = 'low';
            gate.destList.forEach((dest) => {
              pulses.push([dest, 'low', gateName]);
            });
          } else {
            gate.lastPulse = 'high';
            gate.destList.forEach((dest) => {
              pulses.push([dest, 'high', gateName]);
            });
          }
        }
      }
    }

    return mapObject(([name, gate]) => [
      name,
      {
        low: count(
          pairwise([...(gate.lowPulses ?? [])]).map(([a, b]) => b - a)
        ),
        high: count(
          pairwise([...(gate.highPulses ?? [])]).map(([a, b]) => b - a)
        ),
      },
    ])(gateGrid);
  }
);

import { min, pipe, sequence, splitEvery, sum, toInts } from 'utils';

const parseInput = pipe(toInts, ([a, b, c, ...rest]) => [
  a,
  b,
  c,
  splitEvery(2)(rest),
]);

export const first = pipe(parseInput, ([a, b, c, oplog]) => {
  let regA = a,
    regB = b,
    regC = c,
    pointer = 0,
    output = [];
  const comboValue = (v) => {
    if (v < 4) return v;
    if (v === 4) return regA;
    if (v === 5) return regB;
    if (v === 6) return regC;
  };
  const ops = {
    0: (v) => {
      regA = Math.floor(regA / 2 ** comboValue(v));
    },
    1: (v) => {
      regB = regB ^ v;
    },
    2: (v) => {
      regB = comboValue(v) % 8;
    },
    3: (v) => {
      if (regA !== 0) pointer = v;
    },
    4: (v) => {
      regB = regC ^ regB;
    },
    5: (v) => {
      output.push(comboValue(v) % 8);
    },
    6: (v) => {
      regB = Math.floor(regA / 2 ** comboValue(v));
    },
    7: (v) => {
      regC = Math.floor(regA / 2 ** comboValue(v));
    },
  };

  while (pointer < oplog.length) {
    const [code, value] = oplog[pointer];
    ops[code](value);
    if (!(code === 3 && regA != 0)) pointer++;
  }

  return output.join();
});

export const second = pipe(
  parseInput,
  ([a, b, c, oplog]) => {
    const input = oplog.flat().join();

    const getOutput = (aVal) => {
      let regA = aVal,
        regB = b,
        regC = c,
        pointer = 0,
        output = [];
      const comboValue = (v) => {
        if (v < 4) return v;
        if (v === 4) return regA;
        if (v === 5) return regB;
        if (v === 6) return regC;
      };
      const ops = {
        0: (v) => {
          regA = Math.floor(regA / 2 ** comboValue(v));
        },
        1: (v) => {
          regB = regB ^ v;
        },
        2: (v) => {
          regB = comboValue(v) % 8;
        },
        3: (v) => {
          if (regA !== 0) pointer = v;
        },
        4: (v) => {
          regB = regC - (regC % 8) + (regC % 8 ^ regB);
        },
        5: (v) => {
          output.push(comboValue(v) % 8);
        },
        6: (v) => {
          regB = Math.floor(regA / 2 ** comboValue(v));
        },
        7: (v) => {
          regC = Math.floor(regA / 2 ** comboValue(v));
        },
      };

      while (pointer < oplog.length) {
        const [code, value] = oplog[pointer];
        ops[code](value);
        if (!(code === 3 && regA != 0)) pointer++;
      }
      return output.join();
    };

    const toCheck = [[]];
    const possible = [];

    while (toCheck.length) {
      const current = toCheck.shift();
      if (current.length === 16) continue;

      sequence(0, 7)
        .map((el) => [...current, el])
        .forEach((combination) => {
          const initA = sum(
            combination.toReversed().map((el, i) => el * 8 ** i)
          );
          const output = getOutput(initA);
          if (input === output) possible.push(initA);

          if (input.endsWith(output)) toCheck.push(combination);
        });
    }

    return possible;
  },
  min
);

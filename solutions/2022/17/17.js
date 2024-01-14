import { copy, map, pipe, split, sum } from 'utils';

const emptyRow = () => Array(7).fill('.');

const figures = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

const translate = ([dx, dy], [x, y]) => [x + dx, y + dy];

const checkPoint =
  (chamber) =>
  ([x, y]) => {
    if (!chamber[x]) chamber[x] = emptyRow();
    return chamber[x][y];
  };

const fillPoint =
  (chamber, char = '#') =>
  ([x, y]) => {
    checkPoint(chamber)([x, y]);
    chamber[x][y] = char;
  };

const debug = (chamber, figure = []) => {
  let temp = copy(chamber);
  figure.forEach(fillPoint(temp, '@'));

  console.log(
    temp
      .reverse()
      .map((l) => (l ?? emptyRow()).join(''))
      .join('\n')
  );
};

const newFloorPoints = (chamber) => {
  const searchDirection = [
    [0, 1],
    [0, -1],
    [-1, 0],
  ];
  const touchedRocks = [];
  const visited = new Set();
  const toCheck = [[chamber.length - 1, 0]];

  while (toCheck.length) {
    const current = toCheck.shift();
    const nextMoves = searchDirection
      .map((dir) => translate(dir, current))
      .filter(checkPoint(chamber))
      .filter((point) => !visited.has(point.toString()));

    if (nextMoves.map(checkPoint(chamber)).some((point) => point === '-'))
      return;

    nextMoves.forEach((point) => {
      const value = checkPoint(chamber)(point);

      if (value === '.') {
        toCheck.push(point);
      }
      if (value === '#') {
        touchedRocks.push(point);
      }

      visited.add(point.join());
    });
  }

  return touchedRocks;
};

const first = pipe(
  split(''),
  map((jet) => (jet === '>' ? [0, 1] : [0, -1])),
  (jets) => {
    const chamber = [Array(7).fill('-')];
    let localMaxHeight = 0;
    let maxHeight = 0;

    let jetOrder = 0;

    for (let i = 0; i < 2022; i++) {
      const spawnPoint = [localMaxHeight + 4, 2];
      let figure = figures[i % figures.length].map((delta) =>
        translate(delta, spawnPoint)
      );

      while (true) {
        const jetDelta = jets[jetOrder % jets.length];
        jetOrder++;
        let newPosition = figure.map((point) => translate(jetDelta, point));

        let newValues = newPosition.map(checkPoint(chamber));
        if (newValues.every((point) => point === '.')) {
          figure = newPosition;
        }

        newPosition = figure.map((point) => translate([-1, 0], point));
        newValues = newPosition.map(checkPoint(chamber));

        if (newValues.every((point) => point === '.')) {
          figure = newPosition;
        } else {
          figure.forEach(fillPoint(chamber));

          localMaxHeight = Math.max(
            localMaxHeight,
            Math.max(...figure.map(([x, y]) => x))
          );

          const newFloor = newFloorPoints(chamber);

          if (newFloor) {
            debug(chamber, newFloor);
            const localMinHeight = Math.min(...newFloor.map(([x, y]) => x));
            localMaxHeight = localMaxHeight - localMinHeight;
            maxHeight = maxHeight + localMinHeight;
            chamber.splice(1, localMinHeight);
          }
          break;
        }
      }
    }

    return maxHeight + localMaxHeight;
  }
);

const toStringState = (chamber) => {
  return chamber
    .filter((row) => row.some((val) => val === '#'))
    .map((row) => row.join(''))
    .join('');
};

pipe(
  split(''),
  map((jet) => (jet === '>' ? [0, 1] : [0, -1])),
  (jets) => {
    const chamberStates = new Map();
    const elevationGains = [];
    const chamber = [Array(7).fill('-')];
    let localMaxHeight = 0;
    let maxHeight = 0;
    let jetOrder = 0;

    for (let i = 0; true; i++) {
      const spawnPoint = [localMaxHeight + 4, 2];
      let figure = figures[i % figures.length].map((delta) =>
        translate(delta, spawnPoint)
      );

      while (true) {
        const jetDelta = jets[jetOrder % jets.length];
        jetOrder++;
        let newPosition = figure.map((point) => translate(jetDelta, point));

        let newValues = newPosition.map(checkPoint(chamber));
        if (newValues.every((point) => point === '.')) {
          figure = newPosition;
        }

        newPosition = figure.map((point) => translate([-1, 0], point));
        newValues = newPosition.map(checkPoint(chamber));

        if (newValues.every((point) => point === '.')) {
          figure = newPosition;
        } else {
          break;
        }
      }

      figure.forEach(fillPoint(chamber));

      const newLocalMax = Math.max(
        localMaxHeight,
        Math.max(...figure.map(([x, y]) => x))
      );
      elevationGains[i] = Math.abs(newLocalMax - localMaxHeight);
      localMaxHeight = newLocalMax;

      const newFloor = newFloorPoints(chamber);

      if (newFloor) {
        const localMinHeight = Math.min(...newFloor.map(([x, y]) => x));
        localMaxHeight = localMaxHeight - localMinHeight;
        maxHeight = maxHeight + localMinHeight;
        chamber.splice(1, localMinHeight);

        const chamberStateKey = toStringState(chamber);
        if (chamberStates.has(chamberStateKey)) {
          const [rockNo, figureNo, jetNo] = chamberStates.get(chamberStateKey);
          if (
            i % figures.length === figureNo &&
            jetOrder % jets.length === jetNo
          ) {
            console.log(
              'Cycle detected',
              i,
              i - chamberStates.get(chamberStateKey)[0],
              chamberStates.get(chamberStateKey),
              [i, i % figures.length, jetOrder % jets.length]
            );
            return [
              chamberStates.get(chamberStateKey)[0],
              i - chamberStates.get(chamberStateKey)[0],
              elevationGains,
            ];
          }
        }

        chamberStates.set(chamberStateKey, [
          i,
          i % figures.length,
          jetOrder % jets.length,
        ]);
      }
    }
  },
  ([firstCycleIndex, cycleLength, elevationGains]) => {
    const initGain = sum(elevationGains.slice(0, firstCycleIndex));
    const cycleGain = sum(
      elevationGains.slice(firstCycleIndex, firstCycleIndex + cycleLength)
    );
    const iterations = 1000000000000 - firstCycleIndex;

    return (
      initGain +
      Math.floor(iterations / cycleLength) * cycleGain +
      sum(
        elevationGains.slice(
          firstCycleIndex,
          firstCycleIndex + (iterations % cycleLength)
        )
      )
    );
  }
);

import {
  filter,
  log,
  map,
  pick,
  pipe,
  sequence,
  reduce,
  split,
  toInts,
  translate,
  zip,
} from 'utils';

const RIGHT = 0,
  DOWN = 1,
  LEFT = 2,
  UP = 3;

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

const parseLevel = pipe(split('\n'), map(split('')), (grid) => [
  reduce({}, (acc, row, rowIndex) =>
    reduce(acc, (innerAcc, point, colIndex) => {
      if (point !== ' ') {
        const hash = [rowIndex, colIndex].toString();
        innerAcc[hash] = point;
      }
      return innerAcc;
    })(row)
  )(grid),
  [grid.length, grid[0].length],
]);

const parseInstructions = pipe(
  (s) => [toInts(s), Array.from(s.match(/\D/g))],
  ([movesAhead, turns]) => movesAhead.map((move, i) => [move, turns[i]])
);

const findStartingPosition = pipe(
  Object.entries,
  filter(([key, val]) => val !== '#'),
  pick(0),
  pick(0),
  toInts
);

const first = pipe(
  split('\n\n'),
  ([level, instructions]) => [
    parseLevel(level),
    parseInstructions(instructions),
  ],
  ([[level, [rowCount, columnCount]], instructions]) => {
    let currentPosition = findStartingPosition(level);
    let directionIndex = 0;

    instructions.forEach(([ahead, turn]) => {
      let stepsLeft = ahead;
      let directionMultiplier = 1;

      do {
        if (directionMultiplier > rowCount) throw 'bruh';
        const nextPositionDelta = directions[directionIndex].map(
          (val) => val * directionMultiplier
        );
        const [nextRow, nextCol] = translate(
          currentPosition,
          nextPositionDelta
        );
        const nextPosition = [
          (nextRow + rowCount) % rowCount,
          (nextCol + columnCount) % columnCount,
        ];

        if (level[nextPosition.toString()] === '#') break;

        if (level[nextPosition.toString()] === '.') {
          stepsLeft--;
          currentPosition = nextPosition;
          directionMultiplier = 1;
        } else {
          directionMultiplier++;
        }
      } while (stepsLeft !== 0);

      if (!turn) return;

      directionIndex =
        (turn === 'R'
          ? directionIndex + 1
          : directionIndex + directions.length - 1) % directions.length;
    });

    return [currentPosition, directionIndex];
  },
  ([[row, col], dir]) => (row + 1) * 1000 + (col + 1) * 4 + dir
);

const edgeSize = 50;

const edgePoints = sequence(0, edgeSize - 1);

const edgeMapping = new Map();

const getEdgePoints = (startingPoint, dir) =>
  edgePoints
    .map((i) => directions[dir].map((dim) => dim * i))
    .map((delta) => translate(startingPoint, delta));

const getPairwiseMapping = (firstEdge, firstDir, secondEdge, secondDir) => [
  ...zip(
    firstEdge.map((point) => [point, firstDir]),
    secondEdge.map((point) => [point, secondDir])
  ),
  ...zip(
    secondEdge.map((point) => [point, (secondDir + 2) % directions.length]),
    firstEdge.map((point) => [point, (firstDir + 2) % directions.length])
  ),
];

[
  ...getPairwiseMapping(
    getEdgePoints([50, 50], DOWN),
    LEFT,
    getEdgePoints([100, 0], RIGHT),
    DOWN
  ),
  ...getPairwiseMapping(
    getEdgePoints([0, 50], DOWN),
    LEFT,
    getEdgePoints([149, 0], UP),
    RIGHT
  ),
  ...getPairwiseMapping(
    getEdgePoints([0, 50], RIGHT),
    UP,
    getEdgePoints([150, 0], DOWN),
    RIGHT
  ),
  ...getPairwiseMapping(
    getEdgePoints([0, 100], RIGHT),
    UP,
    getEdgePoints([199, 0], RIGHT),
    UP
  ),
  ...getPairwiseMapping(
    getEdgePoints([0, 149], DOWN),
    RIGHT,
    getEdgePoints([149, 99], UP),
    LEFT
  ),
  ...getPairwiseMapping(
    getEdgePoints([49, 100], RIGHT),
    DOWN,
    getEdgePoints([50, 99], DOWN),
    LEFT
  ),
  ...getPairwiseMapping(
    getEdgePoints([149, 50], RIGHT),
    DOWN,
    getEdgePoints([150, 49], DOWN),
    LEFT
  ),
].forEach(([first, second]) => {
  edgeMapping.set(first.toString(), second);
});

const second = pipe(
  split('\n\n'),
  ([level, instructions]) => [
    parseLevel(level),
    parseInstructions(instructions),
  ],
  ([[level, [rowCount, columnCount]], instructions]) => {
    debugger;
    let currentPosition = findStartingPosition(level);
    let directionIndex = 0;

    instructions.forEach(([ahead, turn]) => {
      let stepsLeft = ahead;

      do {
        let nextPosition = translate(
          currentPosition,
          directions[directionIndex]
        );

        if (!level[nextPosition.toString()]) {
          const [otherEdgePosition, otherDirection] = edgeMapping.get(
            [currentPosition, directionIndex].toString()
          );
          if (level[otherEdgePosition.toString()] === '#') break;

          if (level[otherEdgePosition.toString()] === '.') {
            stepsLeft--;
            currentPosition = otherEdgePosition;
            directionIndex = otherDirection;
          }
        } else {
          if (level[nextPosition.toString()] === '#') break;

          if (level[nextPosition.toString()] === '.') {
            stepsLeft--;
            currentPosition = nextPosition;
          }
        }
      } while (stepsLeft !== 0);

      if (!turn) return;

      directionIndex =
        (turn === 'R'
          ? directionIndex + 1
          : directionIndex + directions.length - 1) % directions.length;
    });

    return [currentPosition, directionIndex];
  },
  ([[row, col], dir]) => (row + 1) * 1000 + (col + 1) * 4 + dir
);

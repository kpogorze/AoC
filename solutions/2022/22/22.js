import { filter, map, pick, pipe, reduce, split, toInts, translate } from "../../../utils.js";

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
]

const parseLevel = pipe(
  split('\n'),
  map(split('')),
  grid => [
    reduce({}, (acc, row, rowIndex) => reduce(acc, (innerAcc, point, colIndex) => {
      if (point !== ' ') {
        const hash = [rowIndex, colIndex].toString();
        innerAcc[hash] = point
      }
      return innerAcc;
    })(row))(grid),
    [grid.length, grid[0].length]
  ]
)

const parseInstructions = pipe(
  s => [toInts(s), Array.from(s.match(/\D/g))],
  ([movesAhead, turns]) => movesAhead.map((move, i) => [move, turns[i]])
)

const findStartingPosition = pipe(
  Object.entries,
  filter(([key, val]) => val !== '#'),
  pick(0),
  pick(0),
  toInts
)

const first = pipe(
  split('\n\n'),
  ([level, instructions]) => [parseLevel(level), parseInstructions(instructions)],
  ([[level, [rowCount, columnCount]], instructions]) => {
    let currentPosition = findStartingPosition(level)
    let directionIndex = 0;

    instructions.forEach(([ahead, turn]) => {
      let stepsLeft = ahead;
      let directionMultiplier = 1;

      do {
        if (directionMultiplier > rowCount) throw 'bruh';
        const nextPositionDelta = directions[directionIndex].map(val => val * directionMultiplier)
        const [nextRow, nextCol] = translate(currentPosition, nextPositionDelta);
        const nextPosition = [(nextRow + rowCount) % rowCount, (nextCol + columnCount) % columnCount];

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

      directionIndex = (turn === 'R' ? directionIndex + 1 : directionIndex + directions.length - 1) % directions.length
    })

    return [currentPosition, directionIndex]
  },
  ([[row, col], dir]) => (row + 1) * 1000 + (col + 1) * 4 + dir,
);
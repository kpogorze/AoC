import {
  map,
  parseGrid,
  pipe,
  range,
  reverse,
  sum,
  transpose,
} from '../../../utils.js';

const calculateScore = pipe(
  transpose,
  map((col) =>
    range(1, col.length)
      .toReversed()
      .map((score, i) => (col[i] === 'O' ? score : 0))
  ),
  map(sum),
  sum
);

const tilt = pipe(
  map((row) => {
    const newRow = [...row].fill('.');

    let currentPos = 0;
    for (let i = 0; i < row.length; i++) {
      const el = row[i];
      if (el === 'O') {
        newRow[currentPos] = 'O';
        currentPos++;
      }
      if (el === '#') {
        newRow[i] = '#';
        currentPos = i + 1;
      }
    }

    return newRow;
  })
);

const moveNorth = pipe(transpose, tilt, transpose);
const moveWest = pipe(tilt);
const moveSouth = pipe(transpose, map(reverse), tilt, map(reverse), transpose);
const moveEast = pipe(map(reverse), tilt, map(reverse));

const rotateRocks = pipe(moveNorth, moveWest, moveSouth, moveEast);

const first = pipe(parseGrid, moveNorth, calculateScore);

const second = pipe(
  parseGrid,
  (grid) => {
    const rotationResults = [];
    let currentGrid = grid;
    while (true) {
      currentGrid = rotateRocks(currentGrid);
      const stringifiedGrid = currentGrid.map((row) => row.join('')).join();
      const loopBegin = rotationResults.findIndex(
        (res) => res === stringifiedGrid
      );

      if (loopBegin !== -1) {
        return [rotationResults.slice(loopBegin), loopBegin + 1];
      } else {
        rotationResults.push(stringifiedGrid);
      }
    }
  },
  ([loopResults, loopBegin]) => {
    const loopIdxToCalculate = (1000000000 - loopBegin) % loopResults.length;
    return loopResults[loopIdxToCalculate].split(',').map((el) => el.split(''));
  },
  calculateScore
);

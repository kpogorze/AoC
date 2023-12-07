import {
  filter,
  log,
  map,
  multiply,
  pick,
  pipe,
  reduce,
  split,
  sum,
  toInt,
  translate,
} from '../../../utils.js';

const adjacentDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

const first = pipe(
  split('\n'),
  map(split('')),
  (grid) => {
    const numbers = [];
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        const col = row[y];
        if (!Number.isNaN(toInt(row[y]))) {
          const number = [],
            positions = [];
          while (!Number.isNaN(toInt(row[y]))) {
            number.push(row[y]);
            positions.push([x, y]);
            y++;
          }
          numbers.push([
            toInt(number.join('')),
            positions.flatMap((pos) =>
              adjacentDirections.map((adj) => translate(pos, adj))
            ),
          ]);
        }
      }
    }

    return [grid, numbers];
  },
  ([grid, numbers]) =>
    numbers.filter(([number, positions]) =>
      positions.some(
        ([x, y]) =>
          grid[x]?.[y] !== undefined &&
          grid[x]?.[y] !== '.' &&
          Number.isNaN(toInt(grid[x]?.[y]))
      )
    ),
  map(pick(0)),
  sum,
  log
)(input);

const findStars = (arr) =>
  reduce([], (acc, row, x) => {
    reduce(acc, (innerAcc, col, y) => {
      if (col === '*') acc.push([x, y]);
    })(row);

    return acc;
  })(arr);

const second = pipe(
  split('\n'),
  map(split('')),
  (grid) => {
    const numbers = [];
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        const col = row[y];
        if (!Number.isNaN(toInt(row[y]))) {
          const number = [],
            positions = [];
          while (!Number.isNaN(toInt(row[y]))) {
            number.push(row[y]);
            positions.push([x, y]);
            y++;
          }
          numbers.push([
            toInt(number.join('')),
            positions.flatMap((pos) =>
              adjacentDirections.map((adj) => translate(pos, adj))
            ),
          ]);
        }
      }
    }

    const stars = findStars(grid);

    return stars.map(([x, y]) =>
      pipe(
        filter(([number, positions]) =>
          positions.some((pos) => pos[0] === x && pos[1] === y)
        ),
        map(pick(0))
      )(numbers)
    );
  },
  filter((arr) => arr.length === 2),
  map(multiply),
  sum
);
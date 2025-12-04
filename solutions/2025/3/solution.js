import {
  join,
  log,
  map,
  max,
  pairwise,
  pipe,
  split,
  splitByLine,
  sum,
  toInt,
} from 'utils';

const parseInput = pipe(splitByLine, map(split('')), map(map(toInt)));

export const first = pipe(
  parseInput,
  map((row) => {
    const first = max(row.slice(0, row.length - 1));
    const first_index = row.indexOf(first);
    const second = max(row.slice(first_index + 1));
    return first * 10 + second;
  }),
  sum
);

export const second = pipe(
  parseInput,
  map((row) => {
    let solution = row.slice(row.length - 12);

    for (let i = row.length - 13; i >= 0; i--) {
      let newVal = row[i];

      if (newVal < solution[0]) {
        continue;
      }

      solution.unshift(newVal);

      const toRemove = pairwise(solution).findIndex(([a, b]) => a < b);

      if (toRemove) {
        solution.splice(toRemove, 1);
      } else {
        solution.pop();
      }
    }

    return solution;
  }),
  log,
  map(join('')),
  map(toInt),
  sum
);

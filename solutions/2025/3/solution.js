import {
  join,
  log,
  map,
  max,
  pairwise,
  pipe,
  sequence,
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
    let initial = [...sequence(row.length - 12, row.length - 1)];

    for (let i = row.length - 13; i >= 0; i--) {
      let newVal = row[i];

      if (newVal < row[initial[0]]) {
        continue;
      }

      initial.unshift(i);

      const toRemove = pairwise(initial).find(([a, b]) => row[a] < row[b]);
      if (toRemove) {
        initial.splice(initial.indexOf(toRemove[0]), 1);
      } else {
        initial.pop();
      }
    }
    return initial.map((n) => row[n]);
  }),
  map(join('')),
  log,
  map(toInt),
  log,
  sum
);

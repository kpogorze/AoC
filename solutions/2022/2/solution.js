import { map, pipe, split, splitByLine, sum } from 'utils';

const values = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

export const first = pipe(
  splitByLine,
  map(split(' ')),
  map(([a, b]) => [values[a], values[b]]),
  map(([a, b]) => {
    if (a - b == 0) return b + 3;
    if (a - b == -1 || a - b == 2) return b + 6;
    if (a - b == 1 || a - b == -2) return b;
  }),
  sum
);

export const second = pipe(
  splitByLine,
  map(split(' ')),
  map(([a, b]) => [values[a], values[b]]),
  map(([a, b]) => {
    if (b == 1) return ((a + 1) % 3) + 1;
    if (b == 2) return a + 3;
    if (b == 3) return (a % 3) + 1 + 6;
  }),
  sum
);

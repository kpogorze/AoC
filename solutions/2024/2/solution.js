import {
  filter,
  I,
  map,
  pairwise,
  pipe,
  pluck,
  sequence,
  split,
  toInts,
} from 'utils';

const parseInput = pipe(split('\n'), map(toInts));

export const first = pipe(
  parseInput,
  map(pairwise),
  map(map(([a, b]) => a - b)),
  filter(
    (diffs) =>
      (diffs.every((d) => d > 0) || diffs.every((d) => d < 0)) &&
      diffs.every((d) => Math.abs(d) < 4)
  ),
  pluck('length')
);

export const second = pipe(
  parseInput,
  map((levels) => [
    levels,
    ...sequence(0, levels.length - 1).map((id) => levels.toSpliced(id, 1)),
  ]),
  map(map(pairwise)),
  map(map(map(([a, b]) => a - b))),
  map(
    map((diffs) => {
      const isEveryNegative = diffs.every((l) => l < 0);
      const isEveryPositive = diffs.every((l) => l > 0);
      const isEveryLevelSafe = diffs.every((l) => Math.abs(l) < 4);

      return (isEveryNegative || isEveryPositive) && isEveryLevelSafe;
    })
  ),
  filter((results) => results[0] || results.slice(1).some(I)),
  pluck('length')
);

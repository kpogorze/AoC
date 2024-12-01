import {
  apply,
  asc,
  count,
  log,
  map,
  pipe,
  sort,
  split,
  sum,
  toInts,
  zip,
} from 'utils';

const parseInput = pipe(split('\n'), map(toInts));

const first = pipe(
  parseInput,
  (a) => [a.map((n) => n[0]), a.map((n) => n[1])],
  map(sort(asc)),
  apply(zip),
  map((a) => Math.abs(a[0] - a[1])),
  sum
);

const second = pipe(
  parseInput,
  (a) => [a.map((n) => n[0]), count(a.map((n) => n[1]))],
  (a) => a[0].map((k) => k * (a[1][k] ?? 0)),
  sum
);

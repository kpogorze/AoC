import {
  apply,
  asc,
  count,
  end,
  map,
  mapFn,
  pipe,
  sort,
  split,
  start,
  sub,
  sum,
  toInts,
  transpose,
  zip,
} from 'utils';

const parseInput = pipe(split('\n'), map(toInts));

const first = pipe(
  parseInput,
  transpose,
  map(sort(asc)),
  apply(zip),
  map(pipe(apply(sub), Math.abs)),
  sum
);

const second = pipe(
  parseInput,
  mapFn([map(start), pipe(map(end), count)]),
  (a) => a[0].map((k) => k * (a[1][k] ?? 0)),
  sum
);

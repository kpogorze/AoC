import {
  eq,
  exec,
  filter,
  map,
  pipe,
  some,
  sort,
  split,
  splitByLine,
  sum,
  toInts,
} from 'utils';

export const parseInput = pipe(
  split('\n\n'),
  map(splitByLine),
  map(map(toInts))
);

export const first = pipe(
  parseInput,
  ([rules, updates]) =>
    exec(
      updates,
      map(sort((a, b) => (exec(rules, some(eq([b, a]))) ? 1 : -1))),
      filter((u, i) => eq(u, updates[i]))
    ),
  map((u) => u[Math.floor(u.length / 2)]),
  sum
);

export const second = pipe(
  parseInput,
  ([rules, updates]) =>
    exec(
      updates,
      map(sort((a, b) => (exec(rules, some(eq([b, a]))) ? 1 : -1))),
      filter((u, i) => !eq(u, updates[i]))
    ),
  map((u) => u[Math.floor(u.length / 2)]),
  sum
);

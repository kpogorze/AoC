import {
  apply,
  cartesian,
  divideWether,
  eq,
  exec,
  filter,
  K,
  map,
  parseGrid,
  pipe,
  pluck,
  split,
  transpose,
} from 'utils';

const parseInput = pipe(
  split('\n\n'),
  map(parseGrid),
  map(transpose),
  divideWether((g) => g[0][0] === '#')
);

export const first = pipe(
  parseInput,
  ([locks, keys]) => [
    exec(locks, map(map(filter(eq('#')))), map(map(pluck('length')))),
    exec(keys, map(map(filter(eq('.')))), map(map(pluck('length')))),
  ],
  apply(cartesian),
  filter(([lock, key]) => lock.every((el, i) => key[i] >= el)),
  pluck('length')
);

export const second = pipe(K('trud skończon'));

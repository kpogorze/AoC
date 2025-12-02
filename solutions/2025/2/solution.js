import {
  add,
  allNeighborDirs,
  apply,
  asc,
  bfs,
  call,
  cartesian,
  construct,
  copy,
  count,
  desc,
  dfs,
  difference,
  divideWether,
  end,
  enumerate,
  eq,
  every,
  exec,
  filter,
  find,
  flatMap,
  flatten,
  flip,
  gcd,
  getAllNeighbors,
  getPointValue,
  getStrictNeighbors,
  hash,
  I,
  intersection,
  invoke,
  join,
  K,
  lcm,
  log,
  map,
  mapFn,
  mapObject,
  match,
  max,
  memoize,
  min,
  mul,
  multiply,
  negate,
  or,
  orElse,
  pairwise,
  parseGrid,
  pick,
  pipe,
  pluck,
  priorityQueue,
  range,
  reduce,
  reverse,
  rotate,
  scan,
  sequence,
  shift,
  sort,
  split,
  splitByLine,
  splitEvery,
  spreadGrid,
  start,
  strictNeighborDirs,
  sub,
  sum,
  symmetricDifference,
  take,
  toArray,
  toInt,
  toInts,
  translate,
  transpose,
  traverse,
  union,
  unique,
  zip,
} from 'utils';

const parseInput = pipe(split(','), map(split('-')), map(map(toInt)));

export const first = pipe(
  parseInput,
  map(apply(sequence)),
  map(
    filter((n) => {
      const s = n.toString();

      if (s.length % 2 !== 0) {
        return false;
      }

      return s.slice(0, s.length / 2) === s.slice(s.length / 2);
    })
  ),
  flatMap(sum),
  sum
);

export const second = pipe(
  parseInput,
  map(apply(sequence)),
  map(
    filter((n) => {
      const s = n.toString();

      for (let i = 1; i <= s.length / 2; i++) {
        const repeating = exec(s, splitEvery(i), pairwise, every(apply(eq)));

        if (repeating) {
          return true;
        }
      }

      return false;
    })
  ),
  flatMap(sum),
  sum
);

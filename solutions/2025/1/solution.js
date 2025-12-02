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

const parseInput = pipe(splitByLine);

export const first = pipe(
  parseInput,
  map((command) => {
    const dir = command[0];
    const value = toInt(command.slice(1));
    return dir === 'L' ? -value : value;
  }),
  (directions) => {
    let position = 50;
    let res = 0;

    for (const move of directions) {
      position = (position + move + 100) % 100;
      if (position === 0) {
        res += 1;
      }
    }
    return res;
  }
);

export const second = pipe(
  parseInput,
  map((command) => {
    const dir = command[0];
    const value = toInt(command.slice(1));
    return dir === 'L' ? -value : value;
  }),
  log,
  (directions) => {
    let position = 50;
    let res = 0;

    for (const move of directions) {
      console.log(position);
      res += Math.floor(Math.abs(move) / 100);

      const abs_pos = position + (move % 100);
      if (abs_pos >= 100) {
        res += 1;
      }
      if (abs_pos <= 0 && position !== 0) res += 1;

      position = (abs_pos + 100) % 100;
    }
    return res;
  }
);

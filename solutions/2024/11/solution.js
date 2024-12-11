import {
  add,
  allNeighborDirs,
  apply,
  asc,
  call,
  cartesian,
  construct,
  copy,
  count,
  desc,
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
  zip,
} from 'utils';

const parseInput = pipe(toInts);

function mapNumber(el) {
  if (el === 0) {
    return [1];
  }
  if (el.toString().length % 2 === 0) {
    return [
      el.toString().slice(0, el.toString().length / 2),
      el.toString().slice(el.toString().length / 2),
    ].map(toInt);
  }

  return [el * 2024];
}

const est = memoize((id, iterations) => {
  if (iterations === 0) {
    return 1;
  }

  return sum(mapNumber(id).map((el) => est(el, iterations - 1)));
});

export const first = pipe(
  parseInput,
  (input) => {
    return input.map((el) => est(el, 25));
  },
  sum
);

export const second = pipe(
  parseInput,
  (input) => {
    return input.map((el) => est(el, 75));
  },
  sum
);

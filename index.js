import {
  add,
  allNeighborDirs,
  apply,
  asc,
  call,
  cartesian,
  copy,
  count,
  desc,
  difference,
  divideWether,
  end,
  enumerate,
  eq,
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
  min,
  mul,
  multiply,
  negate,
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
  toInt,
  toInts,
  translate,
  transpose,
  union,
  zip,
} from 'utils';

const input = await fetch('./input.txt').then((response) => response.text());

const parseInput = pipe(split('\n'));

const first = pipe(parseInput);

const second = pipe(parseInput);

let before = performance.now();

exec(input, first, log);

console.log('Part 1 took', performance.now() - before);

before = performance.now();

exec(input, second, log);

console.log('Part 2 took', performance.now() - before);

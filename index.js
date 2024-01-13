import {
  allNeighborDirs,
  apply,
  asc,
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
  flatMap,
  flatten,
  gcd,
  getAllNeighbors,
  getPointValue,
  getStrictNeighbors,
  intersection,
  invoke,
  join,
  K,
  lcm,
  log,
  map,
  mapObject,
  match,
  max,
  min,
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
  sum,
  symmetricDifference,
  take,
  toInt,
  toInts,
  translate,
  transpose,
  union,
  zip,
} from './utils.js';

const input = await fetch('./input.txt').then((response) => response.text());

const before = performance.now();

const parseInput = pipe(split(''));

const first = pipe(parseInput);

const second = pipe(parseInput);

pipe(first, log)(input);

pipe(second, log)(input);

console.log('Took', performance.now() - before);

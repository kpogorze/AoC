import {
  allNeighborDirs,
  apply,
  asc,
  cartesian,
  copy,
  count,
  desc,
  divideWether,
  eq,
  filter,
  gcd,
  getAllNeighbors,
  getPointValue,
  invoke,
  join,
  lcm,
  log,
  map,
  mapObject,
  max,
  min,
  multiply,
  negate,
  pairwise,
  parseGrid,
  pick,
  pipe,
  pluck,
  range,
  reduce,
  reverse,
  rotate,
  sort,
  split,
  splitByLine,
  spreadGrid,
  sum,
  take,
  toInt,
  toInts,
  translate,
  transpose,
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

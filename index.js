import {
  asc,
  copy,
  count,
  desc,
  divideWether,
  filter,
  gcd,
  invoke,
  join,
  lcm,
  log,
  map,
  max,
  min,
  multiply,
  negate,
  pairwise,
  parseGrid,
  pick,
  pipe,
  range,
  reduce,
  reverse,
  rotate,
  sort,
  split,
  splitByLine,
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

pipe(
  split(''),

  log
)(input);

console.log('Took', performance.now() - before);

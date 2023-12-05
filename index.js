import { input } from './input.js';
import {
  asc,
  copy,
  count,
  desc,
  divideWether,
  filter,
  gcd,
  join,
  lcm,
  log,
  map,
  max,
  min,
  multiply,
  negate,
  pairwise,
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
  zip,
} from './utils.js';

const before = performance.now();

pipe(
  split(''),

  log
)(input);

console.log('Took', performance.now() - before);

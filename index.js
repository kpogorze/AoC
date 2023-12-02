import { input } from './input.js';
import {
  asc,
  copy,
  count,
  desc,
  filter,
  log,
  map,
  pipe,
  pick,
  reduce,
  sort,
  split,
  splitByLine,
  sum,
  take,
  toInt,
  toInts,
} from './utils.js';

const before = performance.now();

pipe(
  split(''),

  log
)(input);

console.log('Took', performance.now() - before);

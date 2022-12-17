import { input } from "./input.js";
import { asc, copy, count, desc, log, map, pipe, reduce, sort, split, splitByLine, sum, take, toInt } from "./utils.js";

const before = performance.now();

pipe(
  split(''),

  log,
)(input);

console.log('Took', performance.now() - before)

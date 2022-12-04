import { input } from "./input.js";
import { count, desc, log, map, pipe, reduce, sort, split, splitByLine, sum, take, toInt } from "./utils.js";


pipe(
  splitByLine,
  
  log
)(input);

import { map, pairwise, pipe, split, sum, toInts } from '../../../utils.js';

const first = pipe(
  split('\n'),
  map(toInts),
  map((arr) => {
    const lastValues = [arr.at(-1)];
    let diff = [...arr];
    do {
      diff = pairwise(diff).map(([a, b]) => b - a);
      lastValues.push(diff.at(-1));
    } while (diff.some((el) => el !== 0));

    return sum(lastValues);
  }),
  sum
);

const second = pipe(
  split('\n'),
  map(toInts),
  map((arr) => {
    const firstValues = [arr.at(0)];
    let diff = [...arr];
    do {
      diff = pairwise(diff).map(([a, b]) => b - a);
      firstValues.push(diff.at(0));
    } while (diff.some((el) => el !== 0));

    return firstValues.reduceRight((acc, curr) => curr - acc, 0);
  }),
  sum
);

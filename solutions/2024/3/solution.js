import { flatMap, map, multiply, pipe, split, start, sum, toInts } from 'utils';

const parseInput = pipe();

export const first = pipe(
  parseInput,
  (s) => s.match(/mul\(\d+\,\d+\)/g),
  Array.from,
  map(toInts),
  map(multiply),
  sum
);

export const second = pipe(
  parseInput,
  split('do()'),
  map(split("don't()")),
  flatMap(start),
  map(
    pipe(
      (s) => s.match(/mul\(\d+\,\d+\)/g),
      Array.from,
      map(toInts),
      map(multiply),
      sum
    )
  ),
  sum
);

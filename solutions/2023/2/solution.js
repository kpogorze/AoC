import {
  filter,
  map,
  multiply,
  pick,
  pipe,
  reduce,
  split,
  sum,
  toInts,
} from 'utils';

const countMaxCubes = reduce(
  {
    red: 0,
    blue: 0,
    green: 0,
  },
  (acc, curr) => {
    curr.forEach((pull) => {
      if (pull.includes('red')) {
        acc.red = Math.max(acc.red, toInts(pull).at(0));
      }
      if (pull.includes('blue')) {
        acc.blue = Math.max(acc.blue, toInts(pull).at(0));
      }
      if (pull.includes('green')) {
        acc.green = Math.max(acc.green, toInts(pull).at(0));
      }
    });

    return acc;
  }
);

const parseInput = pipe(
  split('\n'),
  map(split(':')),
  map(pick(1)),
  map(split(';')),
  map(map(split(',')))
);

export const first = pipe(
  parseInput,
  map(countMaxCubes),
  map((el, i) => [el, i + 1]),
  filter(
    ([maxPulls]) =>
      maxPulls.red <= 12 && maxPulls.green <= 13 && maxPulls.blue <= 14
  ),
  map(pick(1)),
  sum
);

export const second = pipe(
  parseInput,
  map(countMaxCubes),
  map(pipe(Object.values, multiply)),
  sum
);

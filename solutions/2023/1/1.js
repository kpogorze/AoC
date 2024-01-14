import { filter, join, map, negate, pipe, split, sum, toInt } from 'utils';

const first = pipe(
  split('\n'),
  map(split('')),
  map(map(toInt)),
  map(filter(negate(Number.isNaN))),
  map((arr) => [arr[0], arr.at(-1)]),
  map(join('')),
  map(toInt),
  sum
);

const mapping = Object.entries({
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
});

const second = pipe(
  split('\n'),
  map(split('')),
  map(
    map((ch, i, arr) => {
      const spelledDigit = mapping.find(([k, v]) =>
        arr.join('').slice(i).startsWith(k)
      );

      if (spelledDigit) {
        return spelledDigit[1];
      } else {
        return ch;
      }
    })
  ),
  map(map(toInt)),
  map(filter(negate(Number.isNaN))),
  map((arr) => [arr[0], arr.at(-1)]),
  map(join('')),
  map(toInt),
  sum
);

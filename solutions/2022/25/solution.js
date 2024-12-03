import { pipe, split, map, toInt, reverse, sum, join, log } from 'utils';

const snafuToDec = pipe(
  split(''),
  map((digit) => {
    return digit === '=' ? -2 : digit === '-' ? -1 : digit;
  }),
  map(toInt),
  reverse,
  map((digit, i) => 5 ** i * digit),
  sum
);

const decToSnafu = pipe(
  (dec) => {
    const res = [];
    let temp = dec;

    while (temp) {
      res.push(temp % 5);
      temp = Math.floor(temp / 5);
    }

    return res;
  },
  map((digit, i, arr) => {
    if (digit > 2) {
      arr[i + 1] = (arr[i + 1] ?? 0) + 1;
    }
    if (digit === 3) return '=';
    if (digit === 4) return '-';
    if (digit === 5) return '0';

    return digit.toString();
  }),
  reverse,
  join('')
);

export const first = pipe(split('\n'), map(snafuToDec), sum, decToSnafu, log);

import { count, map, pipe, split, splitByLine, sum } from 'utils';

const toValues = (ch) => {
  if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  if (ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
};

const first = pipe(
  splitByLine,
  map(split('')),
  map(
    pipe(
      (arr) => [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)],
      map(count),
      ([left, right]) => Object.keys(left).find((i) => !!right[i])
    )
  ),
  map(toValues),
  sum
);

const second = pipe(
  splitByLine,
  map(split('')),
  map(count),
  (arr) => {
    const res = [];
    for (let k = 0; k < arr.length; k += 3) {
      res.push([arr[k], arr[k + 1], arr[k + 2]]);
    }

    return res;
  },
  map(([a, b, c]) => Object.keys(a).find((i) => !!b[i] && !!c[i])),
  map(toValues),
  sum
);

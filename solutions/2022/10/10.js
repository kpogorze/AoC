import { map, pipe, split, splitByLine, sum } from "../../../utils.js";

const splitEvery = (n) => (arr) => {
  let res = [], tmp = [];

  for (let i = 1; i < arr.length; i++) {
    tmp.push(arr[i - 1]);
    if (i % n === 0) {
      res.push(tmp);
      tmp = []
    }
  }

  return res
}


const first = pipe(
  splitByLine,
  map(split(' ')),
  arr => {
    const signal = [null, 1];
    arr.forEach(element => {
      signal.push(signal[signal.length - 1]);
      if (element[1]) {
        signal.push(signal[signal.length - 1] + parseInt(element[1]));
      }
    });

    return signal
  },
  arr => [20, 60, 100, 140, 180, 220].map(i => i * arr[i]),
  sum,
);

const second = pipe(
  splitByLine,
  map(split(' ')),
  arr => {
    const signal = [1];
    arr.forEach(element => {
      signal.push(signal[signal.length - 1]);
      if (element[1]) {
        signal.push(signal[signal.length - 1] + parseInt(element[1]));
      }
    });

    return signal
  },
  map((s, i) => Math.abs(s - (i % 40)) <= 1 ? '#' : '.'),
  splitEvery(40),
  map(a => a.join('')),
);

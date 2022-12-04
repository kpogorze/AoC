import { pipe, splitByLine, map, split, log, sum } from "../../../utils.js";

const first = pipe(
  splitByLine,
  map(split('')),
  map(map(ch => {
    if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    if (ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  })),
  log,
  map(arr => {
    const res1 = Array(53).fill(0), res2 = Array(53).fill(0);
    for (let i of arr.slice(0, arr.length / 2)) {
      res1[i]++;
    }
    for (let i of arr.slice(arr.length / 2)) {
      res2[i]++;
    }

    for (let j in res1) {
      if (res1[j] > 0 && res2[j] > 0) return +j
    }
  }),
  sum
);

const second = pipe(
  splitByLine,
  map(split('')),
  map(map(ch => {
    if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    if (ch >= 'A' && ch <= 'Z') return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  })),
  arr => {
    const res = [];
    for (let k = 0; k < arr.length; k += 3) {
      const a = arr[k], b = arr[k + 1], c = arr[k + 2]
      const res1 = Array(53).fill(0), res2 = Array(53).fill(0), res3 = Array(53).fill(0);

      for (let i of a) {
        res1[i]++;
      }
      for (let i of b) {
        res2[i]++;
      }
      for (let i of c) {
        res3[i]++;
      }

      for (let j = 52; j < res1.length; j++) {
        if ((res1[j] > 0) && (res2[j] > 0) && (res3[j] > 0)) {
          res.push[+j]
          break;
        }
      }

      res.push(res1.findIndex((i, val) => res1[val] > 0 && res2[val] > 0 && res3[val] > 0))
    }
    return res
  },
  sum
);
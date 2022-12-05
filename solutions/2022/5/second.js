import { pipe, splitByLine, take, map, log, split, reduce, pick } from "../../../utils.js";

// TODO
const input = ''

const splitByEmptyItem = (arr) => {
  let res = [], tmp = [];

  for (let i of arr) {
    if (!i) {
      res.push(tmp)
      tmp = []
    } else {
      tmp.push(i);
    }
  }

  return res
};

let [crates, moves] = pipe(
  splitByLine,
  splitByEmptyItem,
)(input)

console.log(crates, moves)

crates = pipe(
  take(8),
  a => [map(b => b[1])(a), map(b => b[5])(a), map(b => b[9])(a), map(b => b[13])(a), map(b => b[17])(a), map(b => b[21])(a), map(b => b[25])(a), map(b => b[29])(a), map(b => b[33])(a)],
  map(map(s => s?.trim())),
  map(a => a.filter(Boolean)),
  log
)(crates);

pipe(
  map(split(' ')),
  map(a => [+a[1], a[3] - 1, a[5] - 1]),
  reduce(crates, (acc, [amount, from, to]) => {
    const tmp = [];
    for (let i = 0; i < amount; i++) {
      tmp.push(acc[from].shift())
    }
    for (let i = 0; i < amount; i++) {
      acc[to].unshift(tmp.pop())
    }

    return acc
  }),
  map(pick(0)),
  log
)(moves)
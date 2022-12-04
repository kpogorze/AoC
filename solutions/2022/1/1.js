import { pipe, splitByLine, map, toInt, sum, sort, desc, take } from "../../../utils.js";

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

const first = pipe(
  splitByLine,
  splitByEmptyItem,
  map(map(toInt)),
  map(sum),
  sort(desc),
  take(1),
  sum
);

const second = pipe(
  splitByLine,
  splitByEmptyItem,
  map(map(toInt)),
  map(sum),
  sort(desc),
  take(3),
  sum
);
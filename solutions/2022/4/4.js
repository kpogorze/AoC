import { pipe, splitByLine, map, split, toInt, sum } from "../../../utils.js"

const first = pipe(
  splitByLine,
  map(split(',')),
  map(map(split('-'))),
  map(map(map(toInt))),
  map(([left, right]) => {
    if ((left[0] <= right[0]) && (left[1] >= right[1])) {
      return 1
    }

    if ((right[0] <= left[0]) && (right[1] >= left[1])) {
      return 1
    }
    return 0
  }),
  sum,
)


const second = pipe(
  splitByLine,
  map(split(',')),
  map(map(split('-'))),
  map(map(map(toInt))),
  map(([left, right]) => {
    if ((left[0] <= right[0]) && (left[1] >= right[0])) {
      return 1
    }

    if ((right[0] <= left[0]) && (right[1] >= left[0])) {
      return 1
    }
    return 0
  }),
  sum,
)
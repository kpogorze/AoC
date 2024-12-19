import {
  exec,
  join,
  map,
  pick,
  pipe,
  reduce,
  split,
  splitByLine,
  take,
} from 'utils';

const parseInput = pipe(split('\n\n'), map(splitByLine), ([crates, moves]) => [
  exec(
    crates,
    take(8),
    (a) => [
      map((b) => b[1])(a),
      map((b) => b[5])(a),
      map((b) => b[9])(a),
      map((b) => b[13])(a),
      map((b) => b[17])(a),
      map((b) => b[21])(a),
      map((b) => b[25])(a),
      map((b) => b[29])(a),
      map((b) => b[33])(a),
    ],
    map(map((s) => s?.trim())),
    map((a) => a.filter(Boolean))
  ),
  exec(
    moves,
    map(split(' ')),
    map((a) => [+a[1], a[3] - 1, a[5] - 1])
  ),
]);

export const first = pipe(parseInput, ([crates, moves]) =>
  exec(
    moves,
    reduce(crates, (acc, [amount, from, to]) => {
      for (let i = 0; i < amount; i++) {
        acc[to].unshift(acc[from].shift());
      }
      return acc;
    }),
    map(pick(0)),
    join('')
  )
);

export const second = pipe(parseInput, ([crates, moves]) =>
  exec(
    moves,
    reduce(crates, (acc, [amount, from, to]) => {
      const tmp = [];
      for (let i = 0; i < amount; i++) {
        tmp.push(acc[from].shift());
      }
      for (let i = 0; i < amount; i++) {
        acc[to].unshift(tmp.pop());
      }
      return acc;
    }),
    map(pick(0)),
    join('')
  )
);

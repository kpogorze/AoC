import {
  end,
  eq,
  exec,
  filter,
  join,
  map,
  multiply,
  negate,
  pairwise,
  pipe,
  reverse,
  split,
  splitByLine,
  sum,
  take,
  toInt,
  transpose,
} from 'utils';

const parseInput = pipe(splitByLine);

export const first = pipe(
  parseInput,
  map(split(' ')),
  map(filter(negate(eq('')))),
  transpose,
  map(reverse),
  map(([op, ...rest]) => {
    const operation = op === '*' ? multiply : sum;

    return exec(rest, map(toInt), operation);
  }),
  sum
);

export const second = pipe(
  parseInput,
  map(split('')),
  (arr) => [
    end(arr),
    exec(
      arr,
      end,
      map((op, idx) => (op === ' ' ? -1 : idx)),
      filter(negate(eq(-1))),
      (arr) => [...arr, arr.length + 1],
      pairwise,
      map(([a, b]) => arr.map((row) => row.slice(a, b - 1))),
      map((block) => take(block.length - 1)(block)),
      map(transpose),
      map(map(join(''))),
      map(map(toInt))
    ),
  ],
  ([ops, operands]) =>
    exec(
      ops,
      filter(negate(eq(' '))),
      map((op) => (op === '*' ? multiply : sum)),
      map((operation, idx) => operation(operands[idx])),
      sum
    )
);

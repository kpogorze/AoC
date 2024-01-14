import {
  eq,
  filter,
  getAllNeighbors,
  getPointValue,
  map,
  multiply,
  parseGrid,
  pick,
  pipe,
  sequence,
  spreadGrid,
  sum,
  toInt,
} from 'utils';

const parseInput = pipe(parseGrid, (grid) => {
  const numbers = grid.flatMap((row, x) =>
    Array.from(row.join('').matchAll(/\d+/dg)).map((match) => [
      toInt(match[0]),
      // TODO change to apply(leftExclusiveRange)
      sequence(match.indices[0][0], match.indices[0][1] - 1)
        .map((y) => [x, y])
        .flatMap(getAllNeighbors),
    ])
  );

  return [grid, numbers];
});

const first = pipe(
  parseInput,
  ([grid, numbers]) =>
    numbers.filter(([number, positions]) =>
      positions
        .map(getPointValue(grid))
        .some(
          (val) => val !== undefined && val !== '.' && Number.isNaN(toInt(val))
        )
    ),
  map(pick(0)),
  sum
);

const second = pipe(
  parseInput,
  ([grid, numbers]) =>
    spreadGrid(grid)
      .filter(([pos, el]) => el === '*')
      .map(([starPos]) =>
        numbers
          .filter(([number, positions]) => positions.some(eq(starPos)))
          .map(pick(0))
      ),
  filter((arr) => arr.length === 2),
  map(multiply),
  sum
);

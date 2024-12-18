import {
  bfs,
  end,
  eq,
  exec,
  filter,
  getPointValue,
  getStrictNeighbors,
  map,
  parseGrid,
  pipe,
  spreadGrid,
  start,
  sum,
  toInt,
} from 'utils';

const parseInput = pipe(parseGrid, map(map(toInt)));

export const first = pipe(
  parseInput,
  (grid) =>
    exec(
      grid,
      spreadGrid,
      filter(pipe(end, eq(0))),
      map(start),
      map((pos) =>
        bfs({
          toCheck: [pos],
          stopCondition: (current) =>
            getPointValue(grid, current) === 9 ? 1 : null,
          traversalFn: (current) =>
            getStrictNeighbors(current).filter(
              (el) =>
                getPointValue(grid, el) - getPointValue(grid, current) === 1
            ),
        })
      ),
      map(sum)
    ),
  sum
);

export const second = pipe(
  parseInput,
  (grid) =>
    bfs({
      toCheck: spreadGrid(grid)
        .filter(([, val]) => val === 0)
        .map(start),
      stopCondition: (current) =>
        getPointValue(grid, current) === 9 ? 1 : null,
      traversalFn: (current) =>
        getStrictNeighbors(current).filter(
          (el) => getPointValue(grid, el) - getPointValue(grid, current) === 1
        ),
      canBacktrack: true,
    }),
  sum
);

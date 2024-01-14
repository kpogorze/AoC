import { asc, log, map, pipe, sort, split, splitByLine } from 'utils';

const S = [20, 0];
const E = [20, 139];

const findPathLength = (begin, end, grid) => {
  const visitedOrderGrid = grid.map((line) => line.map(() => -1));
  visitedOrderGrid[begin[0]][begin[1]] = 0;

  const nodesToVisit = [[...begin]];

  const shouldVisit = ([x, y], prev) => {
    if (x < 0 || x >= grid.length || y < 0 || y > grid[0].length) return false;
    if (grid[x][y] - 1 > prev) return false;
    if (visitedOrderGrid[x][y] !== -1) return false;

    return true;
  };

  while (nodesToVisit.length) {
    const [x, y] = nodesToVisit.shift();
    const height = grid[x][y];
    const latestOrder = visitedOrderGrid[x][y];

    const newNodes = pipe(
      map(([dx, dy]) => [x + dx, y + dy]),
      (arr) => arr.filter((coords) => shouldVisit(coords, height))
    )([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]);

    newNodes.forEach(([nx, ny]) => {
      visitedOrderGrid[nx][ny] = latestOrder + 1;
      nodesToVisit.push([nx, ny]);
    });
  }

  return visitedOrderGrid[end[0]][end[1]];
};

const prepareGrid = pipe(
  splitByLine,
  map(split('')),
  map(map((c) => c.charCodeAt(0) - 'a'.charCodeAt(0))),
  log,
  (grid) => {
    grid[S[0]][S[1]] = 0;
    grid[E[0]][E[1]] = 'z'.charCodeAt(0) - 'a'.charCodeAt(0);

    return grid;
  }
);

const first = pipe(prepareGrid, (grid) => findPathLength(S, E, grid), log);

const second = pipe(
  prepareGrid,
  (grid) =>
    grid
      .flatMap((line, x) => line.map((val, y) => (val === 0 ? [x, y] : null)))
      .filter(Boolean)
      .map((begin) => findPathLength(begin, E, grid))
      .filter((len) => len !== -1),
  sort(asc),
  log
);

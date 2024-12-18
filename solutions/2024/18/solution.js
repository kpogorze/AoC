import {
  bfs,
  dfs,
  eq,
  getStrictNeighbors,
  invoke,
  map,
  pick,
  pipe,
  splitByLine,
  take,
  toInts,
} from 'utils';

const size = 70;

const parseInput = pipe(splitByLine, map(toInts));

export const first = pipe(
  parseInput,
  take(1024),
  (points) => {
    const startPos = [0, 0];
    const endPos = [size, size];
    const toCheck = [[startPos, 0]];

    return bfs({
      toCheck,
      checkedFn: (current) => current[0],
      backtrackCheck: (current, checked) => eq(current[0], checked),
      stopCondition: ([current, length]) =>
        eq(current, endPos) ? length : null,
      traversalFn: ([current, length]) =>
        getStrictNeighbors(current)
          .filter((el) => points.every((a) => !eq(a, el)))
          .filter(([x, y]) => x >= 0 && x <= size && y >= 0 && y <= size)
          .map((el) => [el, length + 1]),
      returnFirst: true,
    });
  },
  pick(0)
);

export const second = pipe(
  parseInput,
  (points) => {
    let time = points.length + 1;

    while (--time > 1024) {
      const actualPoints = take(time)(points);
      const startPos = [0, 0];
      const endPos = [size, size];
      const toCheck = [startPos];

      const endReachable = dfs({
        toCheck,
        stopCondition: (current) => (eq(current, endPos) ? true : null),
        traversalFn: (current) =>
          getStrictNeighbors(current)
            .filter((el) => actualPoints.every((a) => !eq(a, el)))
            .filter(([x, y]) => x >= 0 && x <= size && y >= 0 && y <= size),
        returnFirst: true,
      })[0];

      if (endReachable) return points[time];
    }
  },
  invoke('join')
);

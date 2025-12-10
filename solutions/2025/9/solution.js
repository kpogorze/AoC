import {
  cartesian,
  eq,
  exec,
  filter,
  log,
  map,
  max,
  pairwise,
  pipe,
  splitByLine,
  toInts,
} from 'utils';

const parseInput = pipe(splitByLine, map(toInts));

export const first = pipe(
  parseInput,
  (a) => cartesian(a, a),
  map(
    ([[x1, y1], [x2, y2]]) => (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
  ),
  max
);

export const second = pipe(parseInput, (points) => {
  const edges = pairwise([...points, points[0]]);

  const toCheck = cartesian(points, points).filter(([point1, point2]) => {
    if (eq(point1, point2)) {
      return false;
    }

    if (point1[0] === point2[0] || point1[1] === point2[1]) {
      return false;
    }

    return true;
  });

  return exec(
    toCheck,
    log,
    filter(([[x1, y1], [x2, y2]]) => {
      const maxx = Math.max(x1, x2) - 1;
      const minx = Math.min(x1, x2) + 1;
      const maxy = Math.max(y1, y2) - 1;
      const miny = Math.min(y1, y2) + 1;

      return edges.every(([[ex1, ey1], [ex2, ey2]]) => {
        if (
          Math.min(ex1, ex2) > maxx ||
          Math.max(ex1, ex2) < minx ||
          Math.min(ey1, ey2) > maxy ||
          Math.max(ey1, ey2) < miny
        ) {
          return true;
        }
      });
    }),
    log,
    map(
      ([[x1, y1], [x2, y2]]) =>
        (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
    ),
    max
  );
});

import {
  add,
  allNeighborDirs,
  apply,
  asc,
  bfs,
  call,
  cartesian,
  construct,
  copy,
  count,
  desc,
  dfs,
  difference,
  divideWether,
  end,
  enumerate,
  eq,
  every,
  exec,
  filter,
  find,
  flatMap,
  flatten,
  flip,
  gcd,
  getAllNeighbors,
  getPointValue,
  getStrictNeighbors,
  hash,
  I,
  intersection,
  invoke,
  join,
  K,
  lcm,
  log,
  map,
  mapFn,
  mapObject,
  match,
  max,
  memoize,
  min,
  mul,
  multiply,
  negate,
  or,
  orElse,
  pairwise,
  parseGrid,
  pick,
  pipe,
  pluck,
  priorityQueue,
  range,
  reduce,
  reverse,
  rotate,
  scan,
  sequence,
  shift,
  sort,
  split,
  splitByLine,
  splitEvery,
  spreadGrid,
  start,
  strictNeighborDirs,
  sub,
  sum,
  symmetricDifference,
  take,
  toArray,
  toInt,
  toInts,
  translate,
  transpose,
  traverse,
  union,
  unique,
  zip,
} from 'utils';
const size = 70;
const parseInput = pipe(splitByLine, map(toInts));

export const first = pipe(parseInput, (points) => {
  const actualPoints = take(1024)(points);
  const startPos = [0, 0];
  const endPos = [size, size];
  const toCheck = [[startPos, 0]];
  const checked = [];
  let minVal = Infinity;

  while (toCheck.length) {
    const [current, length] = toCheck.shift();
    if (checked.some(eq(current))) continue;
    checked.push(current);
    if (minVal < length) continue;
    if (eq(current, endPos)) {
      return length;
    }

    getStrictNeighbors(current)
      .filter((el) => actualPoints.every((a) => !eq(a, el)))
      .filter(([x, y]) => x >= 0 && x <= size && y >= 0 && y <= size)
      .forEach((el) => toCheck.push([el, length + 1]));
  }
  return minVal;
});

export const second = pipe(parseInput, (points) => {
  let time = points.length + 1;

  while (--time > 1024) {
    const actualPoints = take(time)(points);
    const startPos = [0, 0];
    const endPos = [size, size];
    const toCheck = [startPos];

    const endReachable = dfs(
      [],
      toCheck,
      (current) => (eq(current, endPos) ? true : null),
      (current) =>
        getStrictNeighbors(current)
          .filter((el) => actualPoints.every((a) => !eq(a, el)))
          .filter(([x, y]) => x >= 0 && x <= size && y >= 0 && y <= size)
    )[0];

    if (endReachable) return points[time];
  }
});

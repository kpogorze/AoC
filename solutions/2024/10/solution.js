import {
  add,
  allNeighborDirs,
  apply,
  asc,
  call,
  cartesian,
  construct,
  copy,
  count,
  desc,
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
  zip,
} from 'utils';

const parseInput = pipe(parseGrid, map(map(toInt)));

export const first = pipe(
  parseInput,
  (grid) => {
    const points = spreadGrid(grid);

    return points
      .filter(([, val]) => val === 0)
      .map(start)
      .map((startingPos) => {
        const toCheck = [startingPos];
        const checked = [];

        let reachable = 0;

        while (toCheck.length) {
          const current = toCheck.shift();

          const currentHeight = getPointValue(grid, current);

          if (checked.some((a) => eq(current, a))) {
            continue;
          }

          checked.push(current);

          if (currentHeight === 9) {
            reachable++;
            continue;
          }

          getStrictNeighbors(current)
            .filter((el) => getPointValue(grid, el) - currentHeight === 1)
            .filter((el) => checked.every((a) => !eq(a, el)))
            .forEach((el) => toCheck.push(el));
        }

        return reachable;
      });
  },
  sum
);

export const second = pipe(parseInput, (grid) => {
  const points = spreadGrid(grid);

  const toCheck = points.filter(([, val]) => val === 0).map(start);
  const checked = [];

  let reachable = 0;

  while (toCheck.length) {
    const current = toCheck.shift();

    const currentHeight = getPointValue(grid, current);

    if (checked.some((a) => eq(current, a))) {
      continue;
    }

    if (currentHeight === 9) {
      reachable++;
      continue;
    }

    getStrictNeighbors(current)
      .filter((el) => getPointValue(grid, el) - currentHeight === 1)
      .forEach((el) => toCheck.push(el));
  }

  return reachable;
});

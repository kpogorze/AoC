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

const parseInput = pipe(parseGrid);

export const first = pipe(parseInput, (grid) => {
  const points = spreadGrid(grid);
  const pointMap = new Map(points);
  const uniqueEls = new Set(grid.flat());
  uniqueEls.delete('.');

  const antennaGroups = [...uniqueEls].map((el) =>
    points.filter(([_, s]) => eq(el, s)).map((e) => e[0])
  );

  const antennaPairs = antennaGroups.map((antennas) =>
    cartesian(antennas, antennas)
  );

  const aNodesLocations = antennaPairs.map((group) =>
    group.flatMap(([a1, a2]) => {
      const diff = [a1[0] - a2[0], a1[1] - a2[1]];
      console.log(a1, a2, diff);
      if (diff[0] === 0 && diff[1] === 0) return [];
      return [
        translate(
          a2,
          diff.map((el) => el * -1)
        ),
        translate(a1, diff),
      ];
    })
  );

  console.log(antennaGroups, antennaPairs, aNodesLocations);

  return [...new Set(aNodesLocations.flat().map((e) => hash(e)))]
    .map(toInts)
    .map((el) => {
      console.log(el, getPointValue(grid, el));
      return getPointValue(grid, el);
    })
    .filter(Boolean);
});

export const second = pipe(parseInput, (grid) => {
  const points = spreadGrid(grid);
  const pointMap = new Map(points);
  const uniqueEls = new Set(grid.flat());
  uniqueEls.delete('.');

  const antennaGroups = [...uniqueEls].map((el) =>
    points.filter(([_, s]) => eq(el, s)).map((e) => e[0])
  );

  const antennaPairs = antennaGroups.map((antennas) =>
    cartesian(antennas, antennas)
  );

  const aNodesLocations = antennaPairs.map((group) =>
    group.flatMap(([a1, a2]) => {
      const diff = [a1[0] - a2[0], a1[1] - a2[1]];
      console.log(a1, a2, diff);
      if (diff[0] === 0 && diff[1] === 0) return [];

      let na1 = a1,
        na2 = a2;
      const leftAs = [na1],
        rightAs = [na2];

      while (getPointValue(grid, na1)) {
        na1 = translate(na1, diff);

        leftAs.push(na1);
      }
      while (getPointValue(grid, na2)) {
        na2 = translate(
          na2,
          diff.map((el) => el * -1)
        );

        rightAs.push(na2);
      }

      return [...leftAs, ...rightAs];
    })
  );

  console.log(antennaGroups, antennaPairs, aNodesLocations);

  return [...new Set(aNodesLocations.flat().map((e) => hash(e)))]
    .map(toInts)
    .map((el) => {
      console.log(el, getPointValue(grid, el));
      return getPointValue(grid, el);
    })
    .filter(Boolean);
});

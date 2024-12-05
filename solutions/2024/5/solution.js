import {
  add,
  allNeighborDirs,
  apply,
  asc,
  call,
  cartesian,
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
  toInt,
  toInts,
  translate,
  transpose,
  union,
  zip,
} from 'utils';

export const parseInput = pipe(split('\n\n'), map(splitByLine));

export const first = pipe(
  parseInput,
  map(map(toInts)),
  ([rules, updates]) => {
    return updates.filter(
      (update) =>
        !update.some((el, i, arr) => {
          const elRules = rules.filter((r) => r[0] === el);

          return arr
            .slice(0, i)
            .some((prev) => elRules.map(end).includes(prev));
        })
    );
  },
  map((u) => u[Math.floor(u.length / 2)]),
  sum
);

export const second = pipe(
  parseInput,
  map(map(toInts)),
  ([rules, updates]) => [
    rules,
    updates.filter((update) =>
      update.some((el, i, arr) => {
        const elRules = rules.filter((r) => r[0] === el);

        return arr.slice(0, i).some((prev) => elRules.map(end).includes(prev));
      })
    ),
  ],
  ([rules, updates]) =>
    updates.map((update) => {
      const elRules = update.map((el) => {
        const res = rules.filter((r) => r[0] === el);

        return [el, res.map(end)];
      });

      return elRules.sort((a, b) => (b[1].includes(a[0]) ? 1 : -1));
    }),
  map(map(start)),
  map((u) => u[Math.floor(u.length / 2)]),
  sum
);

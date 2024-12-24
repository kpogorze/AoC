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

const parseInput = pipe(split('\n\n'), map(split('\n')), ([a, b]) => [
  a.map(split(': ')),
  b.map(split(' ')),
]);

export const first = pipe(
  parseInput,
  ([input, rawGates]) => {
    const gates = {};

    rawGates.forEach(([a, op, b, , c]) => {
      if (!gates[a]) {
        gates[a] = [];
      }
      gates[a].push([b, op, c]);
      if (!gates[b]) {
        gates[b] = [];
      }
      gates[b].push([a, op, c]);
    });
    const state = Object.fromEntries(input);

    bfs({
      toCheck: input.map(start),
      stopCondition: K(null),
      traversalFn: (current) => {
        if (!gates[current]) {
          return [];
        }
        return gates[current].flatMap(([other, op, output]) => {
          if (!state[current] || !state[other]) {
            return [];
          }

          if (op === 'AND') {
            state[output] =
              state[current] === '1' && state[other] === '1' ? '1' : '0';
          }
          if (op === 'OR') {
            state[output] =
              state[current] === '1' || state[other] === '1' ? '1' : '0';
          }
          if (op === 'XOR') {
            state[output] = state[current] !== state[other] ? '1' : '0';
          }

          return [output];
        });
      },
      canBacktrack: true,
    });

    return state;
  },
  Object.entries,
  filter(([k]) => k.startsWith('z')),
  sort(([a], [b]) => toInt(b.slice(1)) - toInt(a.slice(1))),
  map(end),
  join(''),
  (a) => parseInt(a, 2)
);

// solved by hand - z gates must be xor, and inputs must be xor of x and y of the same position
// and carry from previous position (OR)
// below code shows what type of gate and on what input z gates depend
export const second = pipe(parseInput, ([input, rawGates]) => {
  const gates = {};

  rawGates.forEach(([a, op, b, , c]) => {
    gates[c] = [a, b, op];
  });

  return Object.keys(gates)
    .filter((a) => a.startsWith('z'))
    .map((gate) => [
      gate,
      gates[gate][2],
      bfs({
        toCheck: [gate],
        stopCondition: (g) =>
          g.startsWith('x') || g.startsWith('y') ? g : null,
        traversalFn: (g) => gates[g].slice(0, 2),
      }),
    ]);
});

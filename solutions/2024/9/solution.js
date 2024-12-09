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

const parseInput = pipe(split(''), map(toInt), splitEvery(2));

export const first = pipe(
  parseInput,
  flatMap(([file, free], i) => [
    ...sequence(1, file).map(K(i)),
    ...sequence(1, free).map(K('.')),
  ]),
  (ar) => [ar, ar.filter(negate(eq('.'))).length],
  ([input, nonEmpty]) => {
    let res = [...input];
    while (res.findIndex(eq('.')) !== nonEmpty) {
      const lastFile = res.findLastIndex(negate(eq('.')));
      const firstEmpty = res.findIndex(eq('.'));
      console.log(firstEmpty, lastFile);

      res[firstEmpty] = res[lastFile];
      res[lastFile] = '.';
    }

    return res;
  },
  filter(negate(eq('.'))),
  map((el, i) => el * i),
  sum
);

export const second = pipe(
  parseInput,
  (a) => [a.map((el, i) => [i, el[0], el[1]])],
  ([files]) => {
    let filesToProcess = files.toReversed();
    let res = [...files];

    filesToProcess.forEach(([id, len, empty = 0], i) => {
      console.log(i);
      const firstFree = res.findIndex((el) => el[2] >= len);
      const toMove = res.findIndex((el) => el[0] === id);

      if (firstFree !== -1 && firstFree < toMove) {
        const newBefore = [...res[firstFree]];
        newBefore[2] = 0;
        res[toMove - 1][2] += len + (res[toMove][2] ?? 0);
        res.splice(toMove, 1);
        res = [
          ...res.slice(0, firstFree),
          newBefore,
          [id, len, res[firstFree][2] - len],
          ...res.slice(firstFree + 1, res.length),
        ];
      }
    });

    return res;
  },
  flatMap(([id, len, free]) => [
    ...sequence(1, len).map(K(id)),
    ...sequence(1, free).map(K('.')),
  ]),
  map((el, i) => (el === '.' ? 0 : el * i)),
  sum
);

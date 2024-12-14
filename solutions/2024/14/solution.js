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

const maxx = 101,
  maxy = 103;
const midx = Math.floor(maxx / 2),
  midy = Math.floor(maxy / 2);

const parseInput = pipe(splitByLine, map(toInts), map(splitEvery(2)));

export const first = pipe(
  parseInput,
  map(([pos, dir]) => translate(pos, dir.map(mul(100)))),
  map(([x, y]) => [x % maxx, y % maxy]),
  map(([x, y]) => [(x + maxx) % maxx, (y + maxy) % maxy]),
  (arr) => [
    arr.filter(([x, y]) => x < midx && y < midy),
    arr.filter(([x, y]) => x < midx && y > midy),
    arr.filter(([x, y]) => x > midx && y < midy),
    arr.filter(([x, y]) => x > midx && y > midy),
  ],
  map(pluck('length')),
  scan(mul)
);

// at 19 and 74 the output is more organized
export const second = pipe(parseInput, (robots) =>
  exec(
    sequence(0, 100),
    flatMap((i) => [19 + maxy * i, 74 + maxx * i]),
    map((i) =>
      exec(
        robots,
        map(([pos, dir]) => translate(pos, dir.map(mul(i)))),
        map(([x, y]) => [x % maxx, y % maxy]),
        map(([x, y]) => [(x + maxx) % maxx, (y + maxy) % maxy]),
        (robots) =>
          sequence(1, maxy)
            .map((y) =>
              sequence(1, maxx)
                .map((x) => (robots.find(eq([x, y])) ? '#' : '.'))
                .join('')
            )
            .join('\n'),
        (el) => {
          console.log(el, i);
          return el;
        }
      )
    ),
    count,
    Object.values
  )
);

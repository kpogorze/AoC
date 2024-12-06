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

const parseInput = pipe(
  parseGrid,
  spreadGrid,
  map(mapFn([pipe(start, join(',')), end])),
  (el) => new Map(el)
);

export const first = pipe(parseInput, (grid) => {
  const pos = [...grid.entries()].find((el) => el[1] === '^')[0];
  let currPos = toInts(pos);
  let currDir = 0;

  let visited = [currPos.join(',')];
  while (true) {
    const newPos = translate(currPos, strictNeighborDirs[currDir % 4]);
    const newField = grid.get(newPos.join(','));
    if (newField === '.' || newField === '^') {
      currPos = newPos;
      if (!visited.includes(newPos.join(','))) {
        visited.push(newPos.join(','));
      }
    }
    if (newField === '#') {
      currDir++;
    }
    if (newField === undefined) {
      break;
    }
  }

  return visited.length;
});

export const second = pipe(parseInput, (grid) =>
  exec(
    grid.entries(),
    Array.from,
    filter(([pos, el]) => el === '.'),
    filter(([pos, el]) => {
      console.log(pos);
      let newGrid = new Map(grid.entries());
      newGrid.set(pos, '#');
      let currPos = toInts(
        [...newGrid.entries()].find((el) => el[1] === '^')[0]
      );
      let currDir = 0;

      let visited = [[...currPos, currDir % 4].join(',')];
      let newField = el;
      while (newField) {
        if (visited.length > 10000) {
          break;
        }
        const newPos = translate(currPos, strictNeighborDirs[currDir % 4]);
        newField = newGrid.get(newPos.join(','));
        if (newField === '.' || newField === '^') {
          currPos = newPos;
          if (!visited.includes([...newPos, currDir % 4].join(','))) {
            visited.push([...newPos, currDir % 4].join(','));
          } else {
            return true;
          }
        }
        if (newField === '#') {
          currDir++;
        }
      }
      return false;
    })
  )
);

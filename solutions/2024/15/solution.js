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
/** @type {Record<string, import('utils').Point2D>} */
const dirs = {
  '^': [-1, 0],
  '<': [0, -1],
  '>': [0, 1],
  v: [1, 0],
};

const parseInput = pipe(split('\n\n'));

export const first = pipe(
  parseInput,
  ([grid, path]) => [spreadGrid(parseGrid(grid)), path],
  ([rawPoints, path]) => {
    const points = rawPoints.filter(([p, v]) => v !== '.');
    const startPoint = points.find(([, el]) => eq(el, '@'));
    const startPos = startPoint[0];

    let currentPos = startPos;

    [...path].forEach((rawDir, i) => {
      const dir = dirs[rawDir];
      const attemptedMove = translate(currentPos, dir);
      const attemptedMoveValue = points.find(([p]) =>
        eq(p, attemptedMove)
      )?.[1];
      if (!attemptedMoveValue) {
        currentPos = attemptedMove;
        startPoint[0] = attemptedMove;
        return;
      }
      if (attemptedMoveValue === '#') {
        return;
      }
      if (attemptedMoveValue === 'O') {
        const boxes = [];
        let subCurrent = attemptedMove;
        let subCurrentValue = attemptedMoveValue;

        while (subCurrentValue === 'O') {
          boxes.push(subCurrent);
          subCurrent = translate(subCurrent, dir);
          subCurrentValue = points.find(([p]) => eq(p, subCurrent))?.[1];
        }

        if (subCurrentValue === '#' || subCurrentValue === 'O') {
          return;
        }
        if (!subCurrentValue) {
          boxes.forEach((box) => {
            points.find(([p]) => eq(p, box))[0] = translate(box, dir);
          });
          currentPos = attemptedMove;
          startPoint[0] = attemptedMove;
        }
      }
    });

    return points;
  },
  filter(([, v]) => v === 'O'),
  map(start),
  map(([x, y]) => x * 100 + y),
  sum
);

export const second = pipe(
  parseInput,
  ([grid, path]) => [
    exec(
      grid,
      parseGrid,
      spreadGrid,
      filter(([p, v]) => v !== '.'),
      map(([[x, y], v]) => [[x, y * 2], v]),
      flatMap(([p, v]) => {
        if (v === '@') {
          return [[p, v]];
        }
        if (v === '#') {
          return [
            [p, v],
            [translate(p, [0, 1]), v],
          ];
        }
        if (v === 'O') {
          return [
            [p, '['],
            [translate(p, [0, 1]), ']'],
          ];
        }
      })
    ),
    path,
  ],
  ([points, path]) => {
    const startPoint = points.find(([, el]) => eq(el, '@'));
    const startPos = startPoint[0];

    let currentPos = startPos;

    [...path].forEach((rawDir, i) => {
      const dir = dirs[rawDir];
      const attemptedMove = translate(currentPos, dir);
      const attemptedMoveValue = points.find(([p]) =>
        eq(p, attemptedMove)
      )?.[1];
      if (!attemptedMoveValue) {
        currentPos = attemptedMove;
        startPoint[0] = attemptedMove;
        return;
      }
      if (attemptedMoveValue === '#') {
        return;
      }
      if (rawDir === '<' || rawDir === '>') {
        const boxes = [];
        let subCurrent = attemptedMove;
        let subCurrentValue = attemptedMoveValue;
        while (subCurrentValue === '[' || subCurrentValue === ']') {
          boxes.push(subCurrent, translate(subCurrent, dir));
          subCurrent = translate(subCurrent, dir.map(mul(2)));
          subCurrentValue = points.find(([p]) => eq(p, subCurrent))?.[1];
        }
        if (subCurrentValue === '#') {
          return;
        }
        if (!subCurrentValue) {
          boxes
            .map((box) => points.find(([p]) => eq(p, box)))
            .forEach((el) => {
              el[0] = translate(el[0], dir);
            });
          currentPos = attemptedMove;
          startPoint[0] = attemptedMove;
        }
      }
      if (rawDir === '^' || rawDir === 'v') {
        const boxes = [];
        let surfaceArea = [attemptedMove];
        let surfaceValues = [attemptedMoveValue];

        while (true) {
          if (surfaceValues.some(eq('#'))) {
            return;
          }
          if (surfaceValues.every(eq(undefined))) {
            boxes
              .map((box) => points.find(([p]) => eq(p, box)))
              .forEach((el) => {
                el[0] = translate(el[0], dir);
              });
            currentPos = attemptedMove;
            startPoint[0] = attemptedMove;
            return;
          }
          surfaceArea = surfaceArea.flatMap((pos, id) => {
            if (boxes.some(eq(pos))) {
              return [];
            }
            if (surfaceValues[id] === '[') {
              boxes.push(pos, translate(pos, [0, 1]));
              return [translate(pos, dir), translate(pos, [dir[0], 1])];
            }
            if (surfaceValues[id] === ']') {
              boxes.push(pos, translate(pos, [0, -1]));
              return [translate(pos, dir), translate(pos, [dir[0], -1])];
            }
          });
          surfaceValues = surfaceArea.map(
            (pos) => points.find(([p]) => eq(p, pos))?.[1]
          );
        }
      }
    });

    return points;
  },
  filter(([, v]) => v === '['),
  map(start),
  map(([x, y]) => x * 100 + y),
  sum
);

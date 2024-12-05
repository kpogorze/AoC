import {
  allNeighborDirs,
  eq,
  exec,
  filter,
  flatMap,
  join,
  log,
  map,
  mapFn,
  mul,
  parseGrid,
  pipe,
  pluck,
  sequence,
  spreadGrid,
  start,
  translate,
} from 'utils';

const parseInput = pipe(parseGrid);

const allDirstimes4 = allNeighborDirs.map((dir) =>
  sequence(0, 3).map((n) => dir.map(mul(n)))
);
export const first = pipe(
  parseInput,
  spreadGrid,
  mapFn([
    pipe(
      map(start),
      map((el) =>
        allDirstimes4.map((line) => line.map(translate(el)).map(join(',')))
      )
    ),
    pipe(
      map((el) => [el[0].toString(), el[1]]),
      (el) => new Map(el)
    ),
  ]),
  ([pointLines, points]) =>
    exec(
      pointLines,
      flatMap(
        pipe(
          map(
            pipe(
              map((el) => points.get(el)),
              filter(Boolean),
              join('')
            )
          ),
          filter(eq('XMAS'))
        )
      )
    ),
  pluck('length')
);

const crossDirs = [
  [
    [-1, -1],
    [0, 0],
    [1, 1],
  ],
  [
    [1, -1],
    [0, 0],
    [-1, 1],
  ],
];
export const second = pipe(
  parseInput,
  mapFn([
    pipe(
      spreadGrid,
      map(start),
      map((el) =>
        crossDirs.map((line) => line.map(translate(el)).map(join(',')))
      )
    ),
    pipe(
      spreadGrid,
      map((el) => [el[0].toString(), el[1]]),
      (el) => new Map(el)
    ),
  ]),
  ([pointLines, points]) =>
    exec(
      pointLines,
      map(
        pipe(
          map(
            pipe(
              map((el) => points.get(el)),
              filter(Boolean),
              join('')
            )
          ),
          filter(pipe(pluck('length'), eq(3)))
        )
      )
    ),
  filter(
    (el) => el.length === 2 && el.every((l) => l === 'MAS' || l === 'SAM')
  ),
  pluck('length')
);

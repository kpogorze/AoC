import {
  apply,
  cartesian,
  end,
  eq,
  exec,
  filter,
  flatMap,
  flatten,
  getPointValue,
  I,
  map,
  mapFn,
  mul,
  negate,
  parseGrid,
  pipe,
  pluck,
  spreadGrid,
  start,
  sub,
  translate,
  unique,
  zip,
} from 'utils';

const parseInput = pipe(parseGrid);

export const first = pipe(
  parseInput,
  mapFn([I, spreadGrid, pipe(flatten, unique, filter(negate(eq('.'))))]),
  ([grid, points, uniqueEls]) =>
    exec(
      uniqueEls,
      map((el) => exec(points, filter(pipe(end, eq(el))), map(start))),
      map((el) => cartesian(el, el)),
      map(filter(([a, b]) => !eq(a, b))),
      flatMap(
        flatMap(([a1, a2]) => {
          const diff = zip(a1, a2).map(apply(sub));

          return [translate(a1, diff), translate(a2, diff.map(mul(-1)))];
        })
      ),
      unique,
      map(getPointValue(grid)),
      filter(Boolean)
    ),
  pluck('length')
);

export const second = pipe(
  parseInput,
  mapFn([I, spreadGrid, pipe(flatten, unique, filter(negate(eq('.'))))]),
  ([grid, points, uniqueEls]) =>
    exec(
      uniqueEls,
      map((el) => exec(points, filter(pipe(end, eq(el))), map(start))),
      map((el) => cartesian(el, el)),
      map(filter(([a, b]) => !eq(a, b))),
      flatMap(
        flatMap(([a1, a2]) => {
          const diff = zip(a1, a2).map(apply(sub));

          const generate = (list, step) =>
            getPointValue(grid, end(list))
              ? generate([...list, translate(end(list), step)], step)
              : list;

          return [
            ...generate([a1], diff),
            ...generate([a2], diff.map(mul(-1))),
          ];
        })
      ),
      unique,
      map(getPointValue(grid)),
      filter(Boolean)
    ),
  pluck('length')
);

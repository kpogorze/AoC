import {
  add,
  apply,
  eq,
  exec,
  filter,
  flip,
  intersection,
  map,
  negate,
  pipe,
  pluck,
  range,
  scan,
  split,
  splitByLine,
  sub,
  toInt,
  union,
} from 'utils';

const parseInput = pipe(
  split('\n\n'),
  map(splitByLine),
  ([ranges, products]) => [
    exec(
      ranges,
      map(split('-')),
      map(map(toInt)),
      map(([start, end]) => range(start, end + 1))
    ),
    products.map(toInt),
  ]
);

export const first = pipe(parseInput, ([ranges, products]) => {
  const fresh = exec(ranges, scan(union));

  return exec(
    products,
    map((product) => [product, product + 1]),
    intersection(fresh),
    filter(negate(eq([]))),
    pluck('length')
  );
});

export const second = pipe(parseInput, ([ranges, products]) => {
  return exec(ranges, scan(union), map(apply(flip(sub))), scan(add));
});

import {
  desc,
  map,
  pipe,
  sort,
  split,
  splitByLine,
  sum,
  take,
  toInt,
} from 'utils';

export const first = pipe(
  split('\n\n'),
  map(splitByLine),
  map(map(toInt)),
  map(sum),
  sort(desc),
  take(1),
  sum
);

export const second = pipe(
  split('\n\n'),
  map(splitByLine),
  map(map(toInt)),
  map(sum),
  sort(desc),
  take(3),
  sum
);

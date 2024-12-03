import {
  apply,
  join,
  map,
  multiply,
  pipe,
  sequence,
  split,
  toInt,
  toInts,
  zip,
} from 'utils';

export const first = pipe(
  split('\n'),
  map(toInts),
  apply(zip),
  map(
    ([time, distance]) =>
      sequence(0, time).filter((held) => held * (time - held) > distance).length
  ),
  multiply
);

export const second = pipe(
  split('\n'),
  map(toInts),
  map(join('')),
  map(toInt),
  ([time, distance]) =>
    sequence(0, time).filter((held) => held * (time - held) > distance).length
);

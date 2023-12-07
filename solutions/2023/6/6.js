import {
  join,
  log,
  map,
  multiply,
  pipe,
  range,
  split,
  toInt,
  toInts,
  zip,
} from '../../../utils.js';

const first = pipe(
  split('\n'),
  map(toInts),
  (a) => zip(...a),
  map(([time, distance]) => {
    return range(0, time).filter((held) => held * (time - held) > distance)
      .length;
  }),
  multiply
);

const second = pipe(
  split('\n'),
  map(toInts),
  map(join('')),
  map(toInt),
  ([time, distance]) => {
    return range(0, time).filter((held) => held * (time - held) > distance)
      .length;
  }
);
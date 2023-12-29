import { map, pipe, sequence, split, sum, toInts } from '../../../utils.js';

const memoize = (fn) => {
  let hit = 0,
    miss = 0;
  const results = new Map();
  return (...arg) => {
    const hash = arg.toString();

    if (results.has(hash)) {
      hit++;
      return results.get(hash);
    }

    miss++;
    const res = fn(...arg);
    results.set(hash, res);

    return res;
  };
};

const countPossibilities = memoize(([gears, groups]) => {
  const currGear = gears[0];

  if (groups.length === 0) {
    if (gears.every((el) => el !== '#')) {
      return 1;
    }
    return 0;
  }

  if (!currGear) {
    return 0;
  }

  const minSpaceRequired = sum(groups) + groups.length - 1;
  if (minSpaceRequired > gears.length + 1) {
    return 0;
  }

  if (currGear === '#') {
    const nextGroup = groups[0];
    if (
      gears.length >= nextGroup &&
      gears.slice(0, nextGroup).every((el) => el === '#' || el === '?') &&
      gears[nextGroup] !== '#'
    ) {
      return countPossibilities([gears.slice(nextGroup + 1), groups.slice(1)]);
    }

    return 0;
  }
  if (currGear === '?') {
    return (
      countPossibilities([gears.slice(1), groups]) +
      countPossibilities([['#', ...gears.slice(1)], groups])
    );
  }
  if (currGear === '.') {
    return countPossibilities([gears.slice(1), groups]);
  }
});

const foldRate = 5;

const both = pipe(
  split('\n'),
  map(split(' ')),
  map(([gears, operational]) => [
    sequence(1, foldRate)
      .map(() => gears)
      .join('?'),
    sequence(1, foldRate)
      .map(() => operational)
      .join(','),
  ]),
  map(([gears, operational]) => [gears.split(''), toInts(operational)]),
  map((arr) => countPossibilities(arr)),
  sum
);

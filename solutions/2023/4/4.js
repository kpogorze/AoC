import { map, pick, pipe, range, split, sum, toInts } from '../../../utils.js';

const first = pipe(
  split('\n'),
  map(split(':')),
  map(pick(1)),
  map(split('|')),
  map(map(toInts)),
  map(
    ([winning, selected]) =>
      selected.filter((sel) => winning.includes(sel)).length
  ),
  map((el) => (el ? Math.pow(2, el - 1) : 0)),
  sum
);

const second = pipe(
  split('\n'),
  map(split(':')),
  map(pick(1)),
  map(split('|')),
  map(map(toInts)),
  map(
    ([winning, selected]) =>
      selected.filter((sel) => winning.includes(sel)).length
  ),
  (winningNumbersCounts) => {
    const couponAmounts = [...winningNumbersCounts].fill(1);

    for (let i = 0; i < couponAmounts.length; i++) {
      const curr = couponAmounts[i];
      range(i + 1, i + winningNumbersCounts[i]).forEach(
        (iel) => (couponAmounts[iel] += curr)
      );
    }

    return couponAmounts;
  },
  sum
);

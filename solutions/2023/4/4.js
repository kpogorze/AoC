import { map, pick, pipe, sequence, split, sum, toInts } from 'utils';

const parseInput = pipe(
  split('\n'),
  map(split(':')),
  map(pick(1)),
  map(split('|')),
  map(map(toInts))
);

const first = pipe(
  parseInput,
  map(
    ([winning, selected]) =>
      selected.filter((sel) => winning.includes(sel)).length
  ),
  map((el) => (el ? Math.pow(2, el - 1) : 0)),
  sum
);

const second = pipe(
  parseInput,
  map(
    ([winning, selected]) =>
      selected.filter((sel) => winning.includes(sel)).length
  ),
  (winningNumbersCounts) => {
    const couponAmounts = [...winningNumbersCounts].fill(1);

    for (let i = 0; i < couponAmounts.length; i++) {
      const curr = couponAmounts[i];
      sequence(i + 1, i + winningNumbersCounts[i]).forEach(
        (iel) => (couponAmounts[iel] += curr)
      );
    }

    return couponAmounts;
  },
  sum
);

import { map, pipe, split, splitByLine, sum, toInts } from 'utils';

const parseInput = pipe(split('\n\n'), map(splitByLine), map(map(toInts)));

export const first = pipe(
  parseInput,
  map(([[a1, a2], [b1, b2], [n1, n2]]) => {
    const bp = (n2 * a1 - n1 * a2) / (a1 * b2 - b1 * a2);
    const ap = (n1 - b1 * bp) / a1;

    if (Math.floor(bp) !== bp) {
      return 0;
    }

    return ap * 3 + bp;
  }),
  sum
);

export const second = pipe(
  parseInput,
  map(([[a1, a2], [b1, b2], n]) => {
    const n1 = n[0] + 10000000000000;
    const n2 = n[1] + 10000000000000;
    const bp = (n2 * a1 - n1 * a2) / (a1 * b2 - b1 * a2);
    const ap = (n1 - b1 * bp) / a1;

    if (Math.floor(bp) !== bp) {
      return 0;
    }

    return ap * 3 + bp;
  }),
  sum
);

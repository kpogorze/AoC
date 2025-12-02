import {
  apply,
  eq,
  every,
  exec,
  filter,
  map,
  pairwise,
  pipe,
  sequence,
  split,
  splitEvery,
  sum,
  toInt,
} from 'utils';

const parseInput = pipe(split(','), map(split('-')), map(map(toInt)));

export const first = pipe(
  parseInput,
  map(apply(sequence)),
  map(
    filter((n) => {
      const s = n.toString();

      if (s.length % 2 !== 0) {
        return false;
      }

      return s.slice(0, s.length / 2) === s.slice(s.length / 2);
    })
  ),
  map(sum),
  sum
);

export const second = pipe(
  parseInput,
  map(apply(sequence)),
  map(
    filter((n) => {
      const s = n.toString();

      for (let i = 1; i <= s.length / 2; i++) {
        const repeating = exec(s, splitEvery(i), pairwise, every(apply(eq)));

        if (repeating) {
          return true;
        }
      }

      return false;
    })
  ),
  map(sum),
  sum
);

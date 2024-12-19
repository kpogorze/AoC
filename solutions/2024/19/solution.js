import { dfs, memoize, pipe, pluck, split, sum } from 'utils';

const parseInput = pipe(split('\n\n'), ([towels, designs]) => [
  towels.split(', '),
  designs.split('\n'),
]);

export const first = pipe(
  parseInput,
  ([towels, designs]) =>
    designs.filter((des, i) => {
      return (
        dfs({
          toCheck: [des],
          stopCondition: (el) => (el.length === 0 ? true : null),
          traversalFn: (el) =>
            towels
              .filter((t) => el.startsWith(t))
              .map((t) => el.slice(t.length)),
          canBacktrack: true,
          returnFirst: true,
        }).length != 0
      );
    }),
  pluck('length')
);

export const second = pipe(
  parseInput,
  ([towels, designs]) => {
    const getCombos = memoize((el) => {
      if (el.length === 0) return 1;

      return sum([
        0,
        ...towels
          .filter((t) => el.startsWith(t))
          .map((t) => getCombos(el.slice(t.length))),
      ]);
    });
    return designs.map((des, i) => {
      return getCombos(des);
    });
  },
  sum
);

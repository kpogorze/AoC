import {
  count,
  dfs,
  end,
  eq,
  filter,
  getPointValue,
  getStrictNeighbors,
  map,
  parseGrid,
  pipe,
  spreadGrid,
  sum,
} from 'utils';

const parseInput = pipe(parseGrid, (grid) => {
  const points = spreadGrid(grid);
  const startPos = points.find(([, el]) => el === 'S')[0];
  const endPos = points.find(([, el]) => el === 'E')[0];

  const track = [];
  let len = 0;

  dfs({
    toCheck: [startPos],
    stopCondition: (current) => (eq(current, endPos) ? true : null),
    traversalFn: (current) => {
      track.push([current, len]);
      len++;

      return getStrictNeighbors(current).filter(
        (el) => getPointValue(grid, el) !== '#'
      );
    },
    returnFirst: true,
  });

  track.push([endPos, len]);

  return track;
});

export const first = pipe(
  parseInput,
  (track) => {
    const getReachable = ([x, y]) =>
      track.filter(([[tx, ty]]) => Math.abs(tx - x) + Math.abs(ty - y) <= 2);

    return track.flatMap(([pos, len]) =>
      getReachable(pos)
        .filter(([, rlen]) => rlen > len)
        .map(([rpos, rlen]) => rlen - len - 2)
    );
  },
  count,
  Object.entries,
  filter(([k]) => +k >= 100),
  map(end),
  sum
);

export const second = pipe(
  parseInput,
  (track) => {
    const getReachable = ([x, y]) =>
      track.filter(([[tx, ty]]) => Math.abs(tx - x) + Math.abs(ty - y) <= 20);

    return track.flatMap(([pos, len]) =>
      getReachable(pos)
        .filter(([, rlen]) => rlen > len)
        .map(
          ([rpos, rlen]) =>
            rlen -
            len -
            (Math.abs(pos[0] - rpos[0]) + Math.abs(pos[1] - rpos[1]))
        )
    );
  },
  count,
  Object.entries,
  filter(([k]) => +k >= 100),
  map(end),
  sum
);

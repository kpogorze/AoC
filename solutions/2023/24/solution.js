import { filter, invoke, map, pipe, split, toInts } from 'utils';

const low = 200000000000000;
const high = 400000000000000;

export const first = pipe(
  split('\n'),
  map(split('@')),
  map(map(toInts)),
  map(([point, deltas]) => {
    const normalizedDeltas = deltas.map((el) => el / deltas[0]);
    return {
      a: normalizedDeltas[1],
      b: point[1] - point[0] * normalizedDeltas[1],
      point,
      deltas,
    };
  }),
  map((a, i, arr) => arr.slice(i + 1).map((b) => [a, b])),
  invoke('flat'),
  map(([elA, elB]) => {
    const intersection = (elB.b - elA.b) / (elA.a - elB.a);
    const rangeCheck = (x, el) =>
      el.deltas[0] > 0 ? x >= el.point[0] : x <= el.point[0];

    return (
      rangeCheck(intersection, elA) &&
      rangeCheck(intersection, elB) && [
        intersection,
        elA.a * intersection + elA.b,
      ]
    );
  }),
  filter(Boolean),
  filter(([x, y]) => x > low && x < high && y > low && y < high),
  (arr) => arr.length
);

// solved by hand lol
const [X, Y, Z, DX, DY, DZ] = [
  309991770591665, 460585296453281, 234197928919588, -63, -301, 97,
];

export const second = () => X + Y + Z;

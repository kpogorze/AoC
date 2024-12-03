import { divideWether, map, pipe, sort, split, sum, toInts, zip } from 'utils';

export const first = pipe(
  split('\n'),
  map(split('~')),
  map(map(toInts)),
  map(([a, b], i) => [...zip(a, b), i + 1]),
  sort((a, b) => a[2][0] - b[2][0]),
  divideWether(([x, y, z]) => z[0] === 1),
  ([settled, falling]) => {
    const relations = Object.fromEntries(
      settled.map((brick) => [
        brick[3],
        {
          brick,
          supports: [],
          supportedBy: [],
        },
      ])
    );

    while (falling.length) {
      const brick = falling.shift();
      const colliding = settled.filter(
        ([x, y]) =>
          !(x[1] < brick[0][0] || x[0] > brick[0][1]) &&
          !(y[1] < brick[1][0] || y[0] > brick[1][1])
      );
      const firstCollidingZ = colliding.length
        ? Math.max(...colliding.map(([x, y, z]) => z[1]))
        : 0;
      const supportedBy = colliding.filter(
        ([x, y, z]) => z[1] === firstCollidingZ
      );
      brick[2] = [
        firstCollidingZ + 1,
        firstCollidingZ + 1 + brick[2][1] - brick[2][0],
      ];

      settled.push(brick);
      relations[brick[3]] = {
        brick,
        supports: [],
        supportedBy: supportedBy.map(([x, y, z, id]) => id),
      };
      supportedBy.forEach(([x, y, z, id]) => {
        relations[id].supports.push(brick[3]);
      });
    }

    return relations;
  },
  (relations) =>
    Object.values(relations).map((relation) =>
      relation.supports.length === 0 ||
      relation.supports.every(
        (brickId) => relations[brickId].supportedBy.length > 1
      )
        ? 1
        : 0
    ),
  sum
);

export const second = pipe(
  split('\n'),
  map(split('~')),
  map(map(toInts)),
  map(([a, b], i) => [...zip(a, b), i + 1]),
  sort((a, b) => a[2][0] - b[2][0]),
  divideWether(([x, y, z]) => z[0] === 1),
  ([settled, falling]) => {
    const relations = Object.fromEntries(
      settled.map((brick) => [
        brick[3],
        {
          brick,
          supports: [],
          supportedBy: [],
        },
      ])
    );

    while (falling.length) {
      const brick = falling.shift();
      const colliding = settled.filter(
        ([x, y]) =>
          !(x[1] < brick[0][0] || x[0] > brick[0][1]) &&
          !(y[1] < brick[1][0] || y[0] > brick[1][1])
      );
      const firstCollidingZ = colliding.length
        ? Math.max(...colliding.map(([x, y, z]) => z[1]))
        : 0;
      const supportedBy = colliding.filter(
        ([x, y, z]) => z[1] === firstCollidingZ
      );
      brick[2] = [
        firstCollidingZ + 1,
        firstCollidingZ + 1 + brick[2][1] - brick[2][0],
      ];
      settled.push(brick);
      relations[brick[3]] = {
        brick,
        supports: [],
        supportedBy: supportedBy.map(([x, y, z, id]) => id),
      };
      supportedBy.forEach(([x, y, z, id]) => {
        relations[id].supports.push(brick[3]);
      });
    }

    return relations;
  },
  (relations) =>
    Object.values(relations).map((relation) => {
      const score = new Set([relation.brick[3]]);

      const toCheck = [relation.brick[3]];

      while (toCheck.length) {
        const checkedId = toCheck.shift();
        relations[checkedId].supports.forEach((id) => {
          if (relations[id].supportedBy.every((i) => score.has(i))) {
            score.add(id);
            toCheck.push(id);
          }
        });
      }

      return score.size - 1;
    }),
  sum
);

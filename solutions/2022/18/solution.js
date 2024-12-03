import { asc, map, pipe, split, toInt } from 'utils';

const parseInput = pipe(split('\n'), map(split(',')), map(map(toInt)));

export const first = pipe(parseInput, (points) => {
  const pointSet = new Set(points.map((point) => point.toString()));

  const transformations = [
    [0, 0, 1],
    [0, 0, -1],
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
  ];

  return points
    .flatMap(([x, y, z]) =>
      transformations.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz])
    )
    .filter((point) => !pointSet.has(point.toString())).length;
});

const translate = ([x, y, z], [dx, dy, dz]) => [x + dx, y + dy, z + dz];

export const second = pipe(parseInput, (points) => {
  const pointSet = new Set(points.map((point) => point.toString()));
  const transformations = [
    [0, 0, 1],
    [0, 0, -1],
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
  ];

  const xValues = points.map(([x]) => x).sort(asc);
  const yValues = points.map(([x, y]) => y).sort(asc);
  const zValues = points.map(([x, y, z]) => z).sort(asc);
  const minX = xValues[0] - 1,
    maxX = xValues[xValues.length - 1] + 1;
  const minY = yValues[0] - 1,
    maxY = yValues[xValues.length - 1] + 1;
  const minZ = zValues[0] - 1,
    maxZ = zValues[xValues.length - 1] + 1;

  let total = 0;
  const toCheck = [[minX, minY, minZ]];
  const inCheck = new Set([toCheck[0].toString()]);

  while (toCheck.length) {
    const current = toCheck.shift();

    const adjacent = transformations.map((delta) => translate(current, delta));

    const adjacentRocks = adjacent.filter((point) =>
      pointSet.has(point.toString())
    );
    const adjacentAir = adjacent.filter(
      (point) => !pointSet.has(point.toString())
    );

    total += adjacentRocks.length;

    const airToVisit = adjacentAir
      .filter((point) => !inCheck.has(point.toString()))
      .filter(
        ([x, y, z]) =>
          x >= minX &&
          x <= maxX &&
          y >= minY &&
          y <= maxY &&
          z >= minZ &&
          z <= maxZ
      );

    airToVisit.forEach((point) => {
      toCheck.push(point);
      inCheck.add(point.toString());
    });
  }

  return total;
});

import {
  divideWether,
  map,
  pairwise,
  parseGrid,
  pick,
  pipe,
  sequence,
  sum,
  toInt,
  toInts,
  translate,
} from 'utils';

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

const debugGrid = parseGrid(input);
const debug = (possible) => {
  const maxX = Math.max(...possible.map(pick(0)), debugGrid.length - 1);
  const minX = Math.min(...possible.map(pick(0)), 0);
  const maxY = Math.max(...possible.map(pick(1)), debugGrid.length - 1);
  const minY = Math.min(...possible.map(pick(1)), 0);

  const level = sequence(minX, maxX)
    .map((x) =>
      sequence(minY, maxY)
        .map((y) => {
          const adjustedX =
            ((x % debugGrid.length) + debugGrid.length) % debugGrid.length;
          const adjustedY =
            ((y % debugGrid.length) + debugGrid.length) % debugGrid.length;
          if (possible.find((el) => el.toString() === [x, y].toString())) {
            return 'O';
          }
          return debugGrid[adjustedX][adjustedY];
        })
        .join('')
    )
    .join('\n');

  console.log(level);

  return possible;
};

const first = pipe(
  parseGrid,
  (grid) => {
    for (const x of sequence(0, grid.length - 1)) {
      for (const y of sequence(0, grid.length - 1)) {
        if (grid[x][y] === 'S') {
          return [grid, [x, y]];
        }
      }
    }
  },
  ([grid, startingPos]) => {
    let nextToCheck = new Set([startingPos.toString()]);
    let toCheck = [];

    for (const step of sequence(1, 65)) {
      toCheck = Array.from(nextToCheck)
        .map((el) => el.split(','))
        .map(map(toInt));
      nextToCheck = new Set();

      while (toCheck.length) {
        const pos = toCheck.shift();

        directions.forEach((dir) => {
          const newPos = translate(pos, dir);
          if (
            grid[newPos[0]]?.[newPos[1]] === '.' ||
            grid[newPos[0]]?.[newPos[1]] === 'S'
          ) {
            nextToCheck.add(newPos.toString());
          }
        });
      }
      debug([...nextToCheck.values()].map(toInts));
    }

    return nextToCheck.size;
  }
);

const calcDiffs = pipe(
  pairwise,
  map(([a, b]) => b - a)
);

const second = pipe(
  parseGrid,
  (grid) => {
    for (const x of sequence(0, grid.length - 1)) {
      for (const y of sequence(0, grid.length - 1)) {
        if (grid[x][y] === 'S') {
          return [grid, [x, y]];
        }
      }
    }
  },
  ([grid, startingPos]) => {
    const newPositions = [new Set([startingPos.toString()])];
    const positionsCount = [];

    for (const step of sequence(1, 1000)) {
      const outers = new Set();
      outers.va;
      const positionsToCheck = Array.from(newPositions.at(-1).values()).map(
        toInts
      );
      positionsToCheck.forEach((posToCheck) => {
        directions.forEach((adjacentDir) => {
          const adjacentPos = translate(posToCheck, adjacentDir);
          const adjustedPos =
            grid[((adjacentPos[0] % grid.length) + grid.length) % grid.length][
              ((adjacentPos[1] % grid.length) + grid.length) % grid.length
            ];
          const isADupe = (newPositions.at(-2) ?? new Set()).has(
            adjacentPos.toString()
          );
          const isSuitable = adjustedPos === '.' || adjustedPos === 'S';
          if (!isADupe && isSuitable) {
            outers.add(adjacentPos.toString());
          }
        });
      });
      newPositions.push(outers);

      if (newPositions.length > 2) {
        positionsCount.push(newPositions.shift().size);
      }
    }

    return positionsCount.concat(newPositions.map((el) => el.size));
  },
  map((outer, i, arr) =>
    sum(arr.slice(0, i + 1).filter((el, id) => id % 2 === i % 2))
  ),
  divideWether((_, i) => (i - 65) % 131 === 0),
  pick(0),
  (periodicCounts) => {
    const diffs = [periodicCounts];
    let currentDiffs = [...periodicCounts];
    while (!currentDiffs.every((el) => el === 0)) {
      currentDiffs = calcDiffs(currentDiffs);
      diffs.push(currentDiffs);
    }

    return diffs;
  },
  map(pick(0)),
  ([c0, delta0, delta]) =>
    c0 + delta0 * 202300 + (delta * (202300 - 1) * 202300) / 2
);

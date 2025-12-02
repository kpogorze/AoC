import {
  eq,
  exec,
  getPointValue,
  hash,
  parseGrid,
  pipe,
  pluck,
  priorityQueue,
  spreadGrid,
  strictNeighborDirs,
  translate,
  unique,
} from 'utils';

const parseInput = pipe(parseGrid);

export const first = pipe(parseInput, (grid) =>
  exec(grid, spreadGrid, (points) => {
    const startPos = points.find((el) => el[1] === 'S')[0];
    const endPos = points.find((el) => el[1] === 'E')[0];
    const startDir = 1;
    /** @type {Record<string, number>} */
    const pathRecord = {};
    const toCheck = priorityQueue([[[startPos, startDir, 0, []], 0]]);
    let lowestPath = Infinity;
    let test = 0;

    while (toCheck.hasAny()) {
      const [currentPos, currentDir, pathValue, pathSoFar] = toCheck.get();
      const id = hash(currentPos);
      const lowestPathForPos = pathRecord[id];

      if (lowestPathForPos == null) {
        pathRecord[id] = pathValue;
      } else if (lowestPathForPos < pathValue) {
        continue;
      }

      pathRecord[id] = pathValue;

      if (pathValue > lowestPath) {
        continue;
      }

      if (eq(currentPos, endPos)) {
        lowestPath = Math.min(lowestPath, pathValue);
        continue;
      }

      const nextMoves = [
        [
          translate(currentPos, strictNeighborDirs[(currentDir + 3) % 4]),
          (currentDir + 3) % 4,
          pathValue + 1001,
          [...pathSoFar, currentPos],
        ],
        [
          translate(currentPos, strictNeighborDirs[(currentDir + 1) % 4]),
          (currentDir + 1) % 4,
          pathValue + 1001,
          [...pathSoFar, currentPos],
        ],
        [
          translate(currentPos, strictNeighborDirs[currentDir]),
          currentDir,
          pathValue + 1,
          [...pathSoFar, currentPos],
        ],
      ];

      nextMoves
        .filter(([el]) => getPointValue(grid, el) !== '#')
        .forEach((el) => toCheck.add([el, el[2]]));
    }
    return lowestPath;
  })
);

// very slow ~25 minutes
export const second = pipe(parseInput, (grid) =>
  exec(
    grid,
    spreadGrid,
    (points) => {
      const startPos = points.find((el) => el[1] === 'S')[0];
      const endPos = points.find((el) => el[1] === 'E')[0];
      const startDir = 1;
      /** @type {Record<string, number>} */
      const pathRecord = {};
      const toCheck = [[startPos, startDir, 0, []]];
      let lowestPath = Infinity;
      let best = [startPos, endPos];

      while (toCheck.length) {
        const [currentPos, currentDir, pathValue, pathSoFar] = toCheck.shift();
        const id = hash(currentPos);
        const lowestPathForPos = pathRecord[id];

        if (eq(currentPos, endPos)) {
          if (pathValue === lowestPath) {
            best.push(...pathSoFar);
          }
          if (pathValue < lowestPath) {
            best = [startPos, endPos, ...pathSoFar];
            lowestPath = pathValue;
          }
          continue;
        }

        if (pathValue > 91000) {
          continue;
        }

        if (lowestPathForPos == null) {
          pathRecord[id] = pathValue % 1000;
        } else if (lowestPathForPos < pathValue % 1000) {
          continue;
        }

        pathRecord[id] = pathValue % 1000;

        if (pathValue > lowestPath) {
          continue;
        }

        const nextMoves = [
          [
            translate(currentPos, strictNeighborDirs[currentDir]),
            currentDir,
            pathValue + 1,
            [...pathSoFar, currentPos],
          ],
          [
            translate(currentPos, strictNeighborDirs[(currentDir + 1) % 4]),
            (currentDir + 1) % 4,
            pathValue + 1001,
            [...pathSoFar, currentPos],
          ],
          [
            translate(currentPos, strictNeighborDirs[(currentDir + 3) % 4]),
            (currentDir + 3) % 4,
            pathValue + 1001,
            [...pathSoFar, currentPos],
          ],
        ];

        toCheck.push(
          ...nextMoves.filter(([el]) => getPointValue(grid, el) !== '#')
        );
      }

      return best;
    },
    unique,
    pluck('length')
  )
);

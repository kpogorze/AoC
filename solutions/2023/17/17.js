import { log, map, min, parseGrid, pick, pipe, toInt, translate } from 'utils';

const directions = {
  east: [0, 1],
  south: [1, 0],
  west: [0, -1],
  north: [-1, 0],
};

const eq = (a, b) => a.every((el, i) => el === b[i]) && a.length === b.length;

const debug = (grid, path) => {
  const level = grid
    .map((row, x) =>
      row
        .map((col, y) =>
          path.some((el) => el.toString() === [x, y].toString()) ? '#' : '.'
        )
        .join('')
    )
    .join('\n');

  log(level);

  return path;
};

const generateHash = ([pos, dir, moves]) => [pos, dir, moves].join('|');

// slow (5m)
const first = pipe(
  parseGrid,
  map(map(toInt)),
  (grid) => {
    const initialCheck = [[0, 0], directions.east, 0, [[0, 0]]];
    const bestPathLengths = new Map([[generateHash(initialCheck), 0]]);
    const toCheck = [initialCheck];
    const guestimate = (node) => {
      const [[x, y]] = node;
      return (
        (grid.length - 1) * 2 -
        x -
        y +
        (bestPathLengths.get(generateHash(node)) ?? Infinity)
      );
    };

    while (toCheck.length) {
      toCheck.sort((a, b) => guestimate(b) - guestimate(a));

      const [prevPos, prevDir, movedInSameDirection, path] = toCheck.pop();

      console.log(
        generateHash([prevPos, prevDir, movedInSameDirection]),
        guestimate([prevPos, prevDir, movedInSameDirection])
      );

      const reverseDir = prevDir.map((el) => el * -1);

      const bannedDirs = [
        reverseDir,
        movedInSameDirection >= 3 ? prevDir : undefined,
      ].filter(Boolean);

      const dirsToCheck = Object.values(directions).filter(
        (a) => !bannedDirs.some((b) => eq(a, b))
      );

      dirsToCheck.forEach((nextDir) => {
        const nextPos = translate(prevPos, nextDir);
        const [x, y] = nextPos;
        const nextPosHash = generateHash([
          nextPos,
          nextDir,
          eq(nextDir, prevDir) ? movedInSameDirection + 1 : 1,
        ]);
        const prevPosHash = generateHash([
          prevPos,
          prevDir,
          movedInSameDirection,
        ]);

        const nextPosBest = bestPathLengths.get(nextPosHash) ?? Infinity;
        const prevPosBest = bestPathLengths.get(prevPosHash) ?? Infinity;

        const el = grid[x]?.[y];

        if (!el) {
          return;
        }

        if (prevPosBest + el < nextPosBest) {
          bestPathLengths.set(nextPosHash, prevPosBest + el);
          toCheck.push([
            nextPos,
            nextDir,
            eq(nextDir, prevDir) ? movedInSameDirection + 1 : 1,
            [...path, nextPos],
          ]);
        }
      });
    }

    return [...bestPathLengths.entries()].filter(([k, v]) =>
      k.includes([grid.length - 1, grid.length - 1].toString())
    );
  },
  map(pick(1)),
  min
);

// very slow (1h)
const second = pipe(
  parseGrid,
  map(map(toInt)),
  (grid) => {
    const initialCheck = [[0, 0], directions.east, 0, [[0, 0]]];
    const bestPathLengths = new Map([[generateHash(initialCheck), 0]]);
    const toCheck = [initialCheck];
    const guestimate = (node) => {
      const [[x, y]] = node;
      return (
        ((grid.length - 1) * 2 - x - y) * 5 +
        (bestPathLengths.get(generateHash(node)) ?? Infinity)
      );
    };

    while (toCheck.length) {
      toCheck.sort((a, b) => guestimate(b) - guestimate(a));

      const [prevPos, prevDir, movedInSameDirection, path] = toCheck.pop();

      debug(grid, path);

      const reverseDir = prevDir.map((el) => el * -1);

      const bannedDirs = [
        reverseDir,
        movedInSameDirection >= 10 ? prevDir : undefined,
      ].filter(Boolean);

      const dirsToCheck =
        movedInSameDirection < 4
          ? [prevDir]
          : Object.values(directions).filter(
              (a) => !bannedDirs.some((b) => eq(a, b))
            );

      dirsToCheck.forEach((nextDir) => {
        const nextPos = translate(prevPos, nextDir);
        const [x, y] = nextPos;
        const nextPosHash = generateHash([
          nextPos,
          nextDir,
          eq(nextDir, prevDir) ? movedInSameDirection + 1 : 1,
        ]);
        const prevPosHash = generateHash([
          prevPos,
          prevDir,
          movedInSameDirection,
        ]);

        const nextPosBest = bestPathLengths.get(nextPosHash) ?? Infinity;
        const prevPosBest = bestPathLengths.get(prevPosHash) ?? Infinity;

        const el = grid[x]?.[y];

        if (!el) {
          return;
        }

        if (prevPosBest + el < nextPosBest) {
          bestPathLengths.set(nextPosHash, prevPosBest + el);
          toCheck.push([
            nextPos,
            nextDir,
            eq(nextDir, prevDir) ? movedInSameDirection + 1 : 1,
            [...path, nextPos],
          ]);
        }
      });
    }

    return [...bestPathLengths.entries()].filter(([k, v]) =>
      k.includes([grid.length - 1, grid.length - 1].toString())
    );
  },
  map(pick(1)),
  min
);

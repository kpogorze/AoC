import { log, map, pipe, split, splitByLine, toInt } from 'utils';

const first = pipe(splitByLine, map(split('')), map(map(toInt)), (grid) => {
  let totalVisible = 0;

  for (let i = 0; i < grid.length; i++) {
    let line = grid[i];
    for (let j = 0; j < line.length; j++) {
      const isVisible = (iDelta, jDelta) => {
        const treesInLine = [];
        let tempi = i + iDelta,
          tempj = j + jDelta;
        while (
          tempi >= 0 &&
          tempi < grid.length &&
          tempj >= 0 &&
          tempj < line.length
        ) {
          treesInLine.push(grid[tempi][tempj]);
          tempi += iDelta;
          tempj += jDelta;
        }

        return !treesInLine.some((tree) => tree >= grid[i][j]);
      };

      if (
        isVisible(1, 0) ||
        isVisible(-1, 0) ||
        isVisible(0, -1) ||
        isVisible(0, 1)
      )
        totalVisible++;
    }
  }

  return totalVisible;
});

const second = pipe(
  splitByLine,
  map(split('')),
  map(map(toInt)),
  (grid) =>
    grid.map((line, i, grid) =>
      line.map((tree, j) => {
        const isVisible = (iDelta, jDelta) => {
          const treesInLine = [];
          let tempi = i + iDelta,
            tempj = j + jDelta;
          while (
            tempi >= 0 &&
            tempi < grid.length &&
            tempj >= 0 &&
            tempj < grid.length
          ) {
            treesInLine.push(grid[tempi][tempj]);
            if (grid[tempi][tempj] >= grid[i][j]) {
              return treesInLine.length;
            }
            tempi += iDelta;
            tempj += jDelta;
          }

          return treesInLine.length;
        };

        return (
          isVisible(1, 0) *
          isVisible(-1, 0) *
          isVisible(0, -1) *
          isVisible(0, 1)
        );
      })
    ),
  map((a) => Math.max(...a)),
  (a) => Math.max(...a),
  log
);

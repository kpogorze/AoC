import { map, pairwise, pipe, sequence, split, sum } from 'utils';

const countReflections = (grid) =>
  sum(
    pairwise(grid).map(([rowA, rowB], rowId) => {
      if (rowA.every((el, i) => el === rowB[i])) {
        const reflectionLen = Math.min(rowId + 1, grid.length - rowId - 1);
        const reflectionPairs = sequence(0, reflectionLen - 1).map((i) => [
          rowId - i,
          rowId + 1 + i,
        ]);
        console.log(reflectionPairs);
        return reflectionPairs
          .map(([i, j]) => [grid[i], grid[j]])
          .every(([a, b]) => a.every((el, i) => el === b[i]))
          ? rowId + 1
          : 0;
      }

      return 0;
    })
  );

const first = pipe(
  split('\n\n'),
  map(split('\n')),
  map(map(split(''))),
  map((grid) => {
    const rowCount = countReflections(grid);

    const cols = grid[0].map((_, col) => grid.map((row) => row[col]));
    const colCount = countReflections(cols);

    return rowCount * 100 + colCount;
  }),
  sum
);

const countReflectionsWithSmudges = (grid) =>
  sum(
    pairwise(grid).map(([rowA, rowB], rowId) => {
      let smudgesCount = sum(rowA.map((el, i) => (el === rowB[i] ? 0 : 1)));
      if (smudgesCount <= 1) {
        const smudgesLeft = 1 - smudgesCount;
        const reflectionLen = Math.min(rowId + 1, grid.length - rowId - 1);
        const reflectionPairs = sequence(0, reflectionLen - 2).map((i) => [
          rowId - 1 - i,
          rowId + 2 + i,
        ]);
        const reflectionSmudges = sum(
          reflectionPairs
            .map(([i, j]) => [grid[i], grid[j]])
            .map(([a, b]) => sum(a.map((el, i) => (el === b[i] ? 0 : 1))))
        );

        return smudgesLeft === reflectionSmudges ? rowId + 1 : 0;
      }

      return 0;
    })
  );

const second = pipe(
  split('\n\n'),
  map(split('\n')),
  map(map(split(''))),
  map((grid) => {
    const rowCount = countReflectionsWithSmudges(grid);

    const cols = grid[0].map((_, col) => grid.map((row) => row[col]));
    const colCount = countReflectionsWithSmudges(cols);

    return rowCount * 100 + colCount;
  }),
  sum
);

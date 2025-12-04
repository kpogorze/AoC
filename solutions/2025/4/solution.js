import {
  eq,
  exec,
  getAllNeighbors,
  hash,
  map,
  parseGrid,
  pipe,
  spreadGrid,
} from 'utils';

const parseInput = pipe(parseGrid, spreadGrid);

export const first = pipe(parseInput, (gridList) => {
  const gridDict = exec(
    gridList,
    map(([pos, value]) => [hash(pos), value]),
    Object.fromEntries
  );

  const reachable = gridList
    .filter(([pos, value]) => value === '@')
    .filter(([pos]) => {
      const neighborValues = getAllNeighbors(pos).map(
        (pos) => gridDict[hash(pos)]
      );
      return neighborValues.filter(eq('@')).length <= 3;
    });

  return reachable.length;
});

export const second = pipe(parseInput, (gridList) => {
  const gridDict = exec(
    gridList,
    map(([pos, value]) => [hash(pos), value]),
    Object.fromEntries
  );

  let result = 0;
  let reachable = [];

  do {
    reachable = gridList
      .filter(([pos]) => gridDict[hash(pos)] === '@')
      .filter(([pos]) => {
        const neighborValues = getAllNeighbors(pos).map(
          (pos) => gridDict[hash(pos)]
        );
        return neighborValues.filter(eq('@')).length <= 3;
      });

    result += reachable.length;

    reachable.forEach(([pos]) => {
      gridDict[hash(pos)] = '.';
    });
  } while (reachable.length > 0);

  return result;
});

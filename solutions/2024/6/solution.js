import {
  construct,
  end,
  eq,
  exec,
  filter,
  hash,
  invoke,
  map,
  mapFn,
  mul,
  parseGrid,
  pipe,
  spreadGrid,
  start,
  strictNeighborDirs,
  take,
  toArray,
  toInts,
  translate,
  traverse,
} from 'utils';

const parseInput = pipe(
  parseGrid,
  spreadGrid,
  map(mapFn([pipe(start, hash), pipe(end)])),
  (el) => new Map(el)
);

const findPath = traverse(
  (grid) => {
    const pos = toInts([...grid.entries()].find((el) => el[1] === '^')[0]);
    return {
      pos,
      dir: 0,
      visited: new Set([hash(pos, 0)]),
      grid,
    };
  },
  ({ pos, grid, visited }) => (!grid.get(hash(pos)) ? visited : null),
  ({ pos, dir, visited, grid }) => {
    const newPos = translate(pos, strictNeighborDirs[dir % 4]);
    const newField = grid.get(hash(newPos));

    if (newField === '#') {
      return { pos, dir: dir + 1, visited, grid };
    }
    if (newField === '.' || newField === '^') {
      visited.add(hash(newPos, dir % 4));
    }

    return {
      pos: newPos,
      dir,
      visited,
      grid,
    };
  }
);
export const first = pipe(
  parseInput,
  findPath,
  invoke('values'),
  toArray,
  map(toInts),
  map(take(2)),
  map((el) => hash(el)),
  construct(Set)
);

export const second = pipe(parseInput, (grid) =>
  exec(
    grid,
    findPath,
    invoke('values'),
    toArray,
    map(toInts),
    ([a, ...tail]) => tail,
    filter(([x, y, dir], i, pathWithDirs) => {
      const obstaclePos = [x, y];
      let currPos = translate(
        obstaclePos,
        strictNeighborDirs[dir % 4].map(mul(-1))
      );
      let currDir = dir;

      const cutoff = pathWithDirs.findIndex(pipe(take(2), eq(obstaclePos)));
      if (cutoff !== i) {
        return false;
      }

      let currPath = pathWithDirs.slice(0, i).map((el) => hash(el));
      grid.set(hash(obstaclePos), '#');

      while (grid.get(hash(currPos))) {
        const newPos = translate(currPos, strictNeighborDirs[currDir % 4]);
        const newField = grid.get(hash(newPos));
        if (!newField) {
          grid.set(hash(obstaclePos), '.');

          return false;
        }
        if (newField === '.' || newField === '^') {
          currPos = newPos;
          if (currPath.includes(hash(currPos, currDir % 4))) {
            grid.set(hash(obstaclePos), '.');
            return true;
          }

          currPath.push(hash(currPos, currDir % 4));
        }
        if (newField === '#') {
          currDir++;
        }
      }
      grid.set(hash(obstaclePos), '.');
      return false;
    })
  )
);

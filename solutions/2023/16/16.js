import {
  log,
  map,
  max,
  parseGrid,
  pipe,
  sequence,
  translate,
} from '../../../utils.js';

const directions = {
  east: [0, 1],
  south: [1, 0],
  west: [0, -1],
  north: [-1, 0],
};

const debug = (grid, energized) => {
  const level = grid
    .map((row, x) =>
      row
        .map((col, y) =>
          [...energized.values()].some(
            (el) => el.split('|')[0] === [x, y].toString()
          )
            ? '#'
            : col
        )
        .join('')
    )
    .join('\n');

  log(level);

  return energized;
};

const eq = (a, b) => a.every((el, i) => el === b[i]) && a.length === b.length;

const calculateEnergized = ([grid, toCheck]) => {
  const energized = new Set();

  while (toCheck.length) {
    const [pos, dir] = toCheck.pop();
    const [x, y] = pos;
    const hash = [pos, dir].join('|');
    const el = grid[x]?.[y];

    if (!grid[x]?.[y]) {
      continue;
    }

    if (energized.has(hash)) {
      continue;
    }

    switch (el) {
      case '.':
        toCheck.push([translate(pos, dir), dir]);
        break;
      case '/':
        if (eq(dir, directions.east)) {
          toCheck.push([translate(pos, directions.north), directions.north]);
        }
        if (eq(dir, directions.north)) {
          toCheck.push([translate(pos, directions.east), directions.east]);
        }
        if (eq(dir, directions.south)) {
          toCheck.push([translate(pos, directions.west), directions.west]);
        }
        if (eq(dir, directions.west)) {
          toCheck.push([translate(pos, directions.south), directions.south]);
        }
        break;
      case '\\':
        if (eq(dir, directions.east)) {
          toCheck.push([translate(pos, directions.south), directions.south]);
        }
        if (eq(dir, directions.north)) {
          toCheck.push([translate(pos, directions.west), directions.west]);
        }
        if (eq(dir, directions.south)) {
          toCheck.push([translate(pos, directions.east), directions.east]);
        }
        if (eq(dir, directions.west)) {
          toCheck.push([translate(pos, directions.north), directions.north]);
        }
        break;
      case '|':
        if (eq(dir, directions.east) || eq(dir, directions.west)) {
          toCheck.push([translate(pos, directions.north), directions.north]);
          toCheck.push([translate(pos, directions.south), directions.south]);
        }
        if (eq(dir, directions.north) || eq(dir, directions.south)) {
          toCheck.push([translate(pos, dir), dir]);
        }
        break;
      case '-':
        if (eq(dir, directions.east) || eq(dir, directions.west)) {
          toCheck.push([translate(pos, dir), dir]);
        }
        if (eq(dir, directions.north) || eq(dir, directions.south)) {
          toCheck.push([translate(pos, directions.east), directions.east]);
          toCheck.push([translate(pos, directions.west), directions.west]);
        }
        break;
    }

    energized.add(hash);
  }

  return new Set([...energized.values()].map((el) => el.split('|')[0])).size;
};

const first = pipe(parseGrid, (grid) =>
  calculateEnergized([grid, [[[0, 0], directions.east]]])
);

const second = pipe(
  parseGrid,
  (grid) => {
    return [
      ...sequence(0, grid.length - 1).map((i) => [
        grid,
        [[[0, i], directions.south]],
      ]),
      ...sequence(0, grid.length - 1).map((i) => [
        grid,
        [[[i, 0], directions.east]],
      ]),
      ...sequence(0, grid.length - 1).map((i) => [
        grid,
        [[[grid.length - 1, i], directions.north]],
      ]),
      ...sequence(0, grid.length - 1).map((i) => [
        grid,
        [[[i, grid.length - 1], directions.west]],
      ]),
    ];
  },
  map(calculateEnergized),
  max
);

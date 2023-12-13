import { map, pipe, split, sum } from '../../../utils.js';

const first = pipe(
  split('\n'),
  map(split('')),
  (grid) => {
    const newGrid = [];
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i];
      if (row.every((el) => el === '.')) newGrid.push([...row]);
      newGrid.push([...row]);
    }

    return newGrid;
  },
  (grid) => {
    let colsToDupe = [];
    for (let i = 0; i < grid[0].length; i++) {
      const col = grid.map((row) => row[i]);
      if (col.every((el) => el === '.')) colsToDupe.push(i);
    }

    return grid.map((row) =>
      row.flatMap((el, i) => (colsToDupe.includes(i) ? [el, el] : [el]))
    );
  },
  (grid) => {
    const galaxies = [];
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        const col = row[y];
        if (col === '#') galaxies.push([x, y]);
      }
    }

    return galaxies.flatMap(([xA, yA]) =>
      galaxies.map(([xB, yB]) => Math.abs(xA - xB) + Math.abs(yA - yB))
    );
  },
  sum,
  (s) => s / 2
);

const second = pipe(
  split('\n'),
  map(split('')),
  (grid) => {
    const rowsToDupe = [];
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i];
      if (row.every((el) => el === '.')) rowsToDupe.push(i);
    }

    let colsToDupe = [];
    for (let i = 0; i < grid[0].length; i++) {
      const col = grid.map((row) => row[i]);
      if (col.every((el) => el === '.')) colsToDupe.push(i);
    }

    const galaxies = [];
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        const col = row[y];
        if (col === '#') galaxies.push([x, y]);
      }
    }

    return galaxies.flatMap(([xA, yA]) =>
      galaxies.map(([xB, yB]) => {
        const minX = Math.min(xA, xB);
        const minY = Math.min(yA, yB);
        const maxX = Math.max(xA, xB);
        const maxY = Math.max(yA, yB);
        const baseDistance = Math.abs(xA - xB) + Math.abs(yA - yB);
        const extraDistance =
          rowsToDupe.filter((x) => x > minX && x < maxX).length *
            (1000000 - 1) +
          colsToDupe.filter((y) => y > minY && y < maxY).length * (1000000 - 1);

        return baseDistance + extraDistance;
      })
    );
  },
  sum,
  (s) => s / 2
);

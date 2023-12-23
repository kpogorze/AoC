import {
  divideWether,
  map,
  max,
  parseGrid,
  pipe,
  range,
  sum,
  translate,
} from '../../../utils.js';

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

const acceptableSlopeDirs = {
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
  '^': [-1, 0],
};

const eq = (a, b) => a.every((el, i) => el === b[i]) && a.length === b.length;

const debugGrid = parseGrid(input);

const startingPos = [0, 1];
const endingPos = [debugGrid.length - 1, debugGrid.length - 2];

const first = pipe(
  parseGrid,
  (grid) => {
    const toCheck = [[startingPos, new Set([startingPos.toString()])]];

    const paths = [];

    while (toCheck.length) {
      const [pos, path] = toCheck.pop();

      if (eq(pos, endingPos)) {
        paths.push(path);
        continue;
      }

      directions.forEach((dir) => {
        const newPos = translate(pos, dir);
        const tile = grid[newPos[0]]?.[newPos[1]];
        if (
          !path.has(newPos.toString()) &&
          tile !== undefined &&
          tile !== '#'
        ) {
          if (tile !== '.' && eq(dir, acceptableSlopeDirs[tile])) {
            toCheck.push([
              translate(newPos, dir),
              new Set([
                ...path.values(),
                newPos.toString(),
                translate(newPos, dir).toString(),
              ]),
            ]);
          }
          if (tile === '.') {
            toCheck.push([
              newPos,
              new Set([...path.values(), newPos.toString()]),
            ]);
          }
        }
      });
    }

    return paths;
  },
  map((el) => el.size - 1),
  max
);

const second = pipe(
  parseGrid,
  (grid) => {
    const areas = [];

    let id = 0;

    const areasToCheck = [
      {
        id,
        areaPos: startingPos,
        points: new Set([startingPos.toString()]),
        connectedTo: [],
      },
    ];

    while (areasToCheck.length) {
      const currArea = areasToCheck.shift();

      let toCheck = currArea.areaPos;

      while (toCheck) {
        const nextPoints = directions
          .map((dir) => {
            const newPos = translate(toCheck, dir);
            const tile = grid[newPos[0]]?.[newPos[1]];
            return [tile, translate(toCheck, dir), dir];
          })
          .filter(
            ([tile, point]) =>
              tile && tile !== '#' && !currArea.points.has(point.toString())
          );
        const [[nextNode], nextSlopes] = divideWether(([tile]) => tile === '.')(
          nextPoints
        );

        toCheck = nextNode?.[1];
        nextSlopes
          .filter(([tile, point, dir]) => eq(acceptableSlopeDirs[tile], dir))
          .forEach(([_, point, dir]) => {
            const nextStartingPos = translate(point, dir);
            if (
              areas.every(
                (area) => !area.points.has(nextStartingPos.toString())
              ) &&
              areasToCheck.every(
                (area) => !area.points.has(nextStartingPos.toString())
              )
            ) {
              id++;
              areasToCheck.push({
                id,
                areaPos: nextStartingPos,
                connectedTo: [],
                points: new Set([nextStartingPos.toString()]),
              });
            }
          });

        if (toCheck) {
          currArea.points.add(toCheck.toString());
        }
      }

      areas.push(currArea);
    }

    for (const x of range(0, grid.length - 1)) {
      for (const y of range(0, grid.length - 1)) {
        const tile = grid[x][y];
        if (tile !== '.' && tile !== '#') {
          const dir = acceptableSlopeDirs[tile];
          const fromArea = areas.find(({ points }) =>
            points.has(
              translate(
                [x, y],
                dir.map((el) => el * -1)
              ).toString()
            )
          );
          const toArea = areas.find(({ points }) =>
            points.has(translate([x, y], dir).toString())
          );

          fromArea.connectedTo.push(toArea.id);
          toArea.connectedTo.push(fromArea.id);
        }
      }
    }

    return areas;
  },
  (areas) => {
    const startingAreaId = areas.find(({ points }) =>
      points.has(startingPos.toString())
    ).id;
    const endingAreaId = areas.find(({ points }) =>
      points.has(endingPos.toString())
    ).id;

    let maxPathLen = 0;

    const toCheck = [[startingAreaId, new Set([startingAreaId])]];

    while (toCheck.length) {
      const [areaId, path] = toCheck.pop();

      if (areaId === endingAreaId) {
        const pathLen =
          sum([...path].map((id) => areas[id].points.size)) + path.size - 2;
        if (pathLen > maxPathLen) {
          maxPathLen = pathLen;
          console.log('found next best', maxPathLen);
        }
        continue;
      }

      areas[areaId].connectedTo
        .filter((id) => !path.has(id))
        .forEach((id) => {
          toCheck.push([id, new Set([...path.values(), id])]);
        });
    }

    return maxPathLen;
  }
);

import { count, desc, log, map, pick, pipe, reduce, sort, split, splitByLine, sum, take, toInt } from "../../../utils.js";

const first = pipe(
  splitByLine,
  map(split(' ')),
  arr => {
    let hx = 0, hy = 0, tx = 0, ty = 0, xDelta = 0, yDelta = 0;
    const positions = [[tx, ty]];
    const isAdjacent = () => !!((Math.abs(xDelta) <= 1) && (Math.abs(yDelta) <= 1))

    arr.forEach(([dir, len]) => {
      for (let i = 0; i < len; i++) {
        switch (dir) {
          case 'L':
            hx--
            break;
          case 'R':
            hx++
            break;
          case 'U':
            hy++
            break;
          case 'D':
            hy--
            break;
        }

        xDelta = hx - tx
        yDelta = hy - ty

        if (!isAdjacent()) {
          tx += xDelta ? xDelta / Math.abs(xDelta) : 0
          ty += yDelta ? yDelta / Math.abs(yDelta) : 0
          positions.push([tx, ty])
        }
      }
    });

    return new Set(positions.map(([x, y]) => `x${x}y${y}`))
  },
)

const second = pipe(
  splitByLine,
  map(split(' ')),
  arr => {
    const coords = Array(10).fill(0).map(() => [0, 0]);
    const positions = [[0, 0]];
    const isAdjacent = (xD, yD) => !!((Math.abs(xD) <= 1) && (Math.abs(yD) <= 1))

    arr.forEach(([dir, len]) => {
      for (let i = 0; i < len; i++) {
        switch (dir) {
          case 'L':
            coords[0][0]--
            break;
          case 'R':
            coords[0][0]++
            break;
          case 'U':
            coords[0][1]++
            break;
          case 'D':
            coords[0][1]--
            break;
        }

        for (let j = 0; j < coords.length - 1; j++) {
          const xDelta = coords[j][0] - coords[j + 1][0]
          const yDelta = coords[j][1] - coords[j + 1][1]

          if (!isAdjacent(xDelta, yDelta)) {
            coords[j + 1][0] += xDelta ? xDelta / Math.abs(xDelta) : 0
            coords[j + 1][1] += yDelta ? yDelta / Math.abs(yDelta) : 0
          }
        }

        positions.push([...coords[coords.length - 1]])
      }
    });

    return new Set(positions.map(([x, y]) => `x${x}y${y}`))
  },
)

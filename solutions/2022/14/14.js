import { asc, count, desc, log, map, pipe, reduce, sort, split, splitByLine, sum, take, toInt } from "../../../utils.js";

const getRockTiles = pipe(
  split('\n'),
  map(split(' -> ')),
  map(map(split(','))),
  map(map(map(toInt))),
  map(map(coord => [coord[0] - 500, coord[1]])),
  rockLines => {
    const occupied = [];

    rockLines.forEach(line => {
      for(let i = 1;i<line.length;i++) {
        const begin = line[i-1], end = line[i];
        const changed = begin[0] !== end[0] ? 0 : 1;
        const same = begin[0] === end[0] ? 0 : 1;
        const start = Math.min(begin[changed], end[changed]);
        const finish = Math.max(begin[changed], end[changed]);

        for(let j = start; j<=finish;j++) {
          const pos = []
          pos[same] = begin[same];
          pos[changed] = j;
          occupied.push(pos)
        }
      }
    });

    return occupied;
  },
)

const first = pipe(
  getRockTiles,
  occupied => {
    const sands = [];

    const getNewSandPos = (startX, startY) => {
      const contact = occupied.filter(([x,y]) => x === startX && y > startY).sort((a,b) => a[1] - b[1])[0];
      if (!contact) return undefined;
      if(occupied.find(([x,y]) => x===contact[0]-1 && y ===contact[1])) {
        if(occupied.find(([x,y]) => x===contact[0]+1 && y ===contact[1])) {
          return [contact[0], contact[1] - 1];
        } else {
          return getNewSandPos(contact[0]+1, contact[1])
        }
      } else {
        return getNewSandPos(contact[0]-1, contact[1])
      }
    }

    let currentSand = getNewSandPos(0, -Infinity)
    while(currentSand) {
      occupied.push(currentSand);
      sands.push(currentSand);
      currentSand = getNewSandPos(0, -Infinity)
    }

    return sands;
  },
);

const second = pipe(
  getRockTiles,
  occupied => {
    const floorY = Math.max(...occupied.map(([x,y]) => y))+2
    const sandsToCheck = [[0,0]];
    const sands = new Set();
    const positions = new Set(occupied.map(([x, y]) => `x${x}y${y}`))

    while(sandsToCheck.length) {
      const [x,y] = sandsToCheck.shift();
      const coords = `x${x}y${y}`
      if(sands.has(coords) || y === floorY || positions.has(coords)) continue;
      sands.add(coords);
      sandsToCheck.push([x, y+1])
      sandsToCheck.push([x-1, y+1])
      sandsToCheck.push([x+1, y+1])
    }

    return sands;
  },
  log
);

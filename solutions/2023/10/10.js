import {
  filter,
  log,
  map,
  max,
  pipe,
  split,
  translate,
} from '../../../utils.js';

const directions = {
  east: [0, 1],
  south: [1, 0],
  west: [0, -1],
  north: [-1, 0],
};

const acceptableElements = {
  east: '-7J',
  south: '|LJ',
  west: '-LF',
  north: '|7F',
};

const first = pipe(
  split('\n'),
  map(split('')),
  (grid) => {
    const gridMap = new Map();
    let startingPosition;
    for (let x = 0; x < grid.length; x++) {
      const row = grid[x];
      for (let y = 0; y < row.length; y++) {
        const col = row[y];
        if (col === 'S') startingPosition = [x, y];
        gridMap.set([x, y].toString(), col);
      }
    }

    const findAcceptableDirections = (pos) =>
      pipe(
        filter(([dirName, dir]) =>
          acceptableElements[dirName].includes(
            gridMap.get(translate(pos, dir).toString())
          )
        ),
        map(([dirName, dir]) => dirName)
      )(Object.entries(directions));

    const visited = new Map();
    visited.set(startingPosition.toString(), 0);
    const toVisit = [[startingPosition, 0]];

    const visit = ([pos, distance]) => {
      console.log(pos, distance);
      visited.set(pos.toString(), distance);
      const nextDirs = findAcceptableDirections(pos);

      pipe(
        map((dirName) => translate(pos, directions[dirName])),
        log,
        filter((nextPos) => !visited.has(nextPos.toString())),
        log,
        map((nextPos) => toVisit.push([nextPos, distance + 1]))
      )(nextDirs);
    };

    while (toVisit.length) {
      const nexToVisit = toVisit.shift();
      visit(nexToVisit);
    }

    return Array.from(visited.values());
  },
  max
);

const scanDirections = {
  '|': {
    north: {
      left: [directions.west],
      right: [directions.east],
      nextDir: 'north',
    },
    south: {
      left: [directions.east],
      right: [directions.west],
      nextDir: 'south',
    },
  },
  '-': {
    west: {
      left: [directions.south],
      right: [directions.north],
      nextDir: 'west',
    },
    east: {
      left: [directions.north],
      right: [directions.south],
      nextDir: 'east',
    },
  },
  L: {
    south: {
      left: [],
      right: [directions.south, directions.west],
      nextDir: 'east',
    },
    west: {
      left: [directions.south, directions.west],
      right: [],
      nextDir: 'north',
    },
  },
  J: {
    east: {
      left: [],
      right: [directions.south, directions.east],
      nextDir: 'north',
    },
    south: {
      left: [directions.south, directions.east],
      right: [],
      nextDir: 'west',
    },
  },
  7: {
    north: {
      left: [],
      right: [directions.north, directions.east],
      nextDir: 'west',
    },
    east: {
      left: [directions.north, directions.east],
      right: [],
      nextDir: 'south',
    },
  },
  F: {
    north: {
      left: [directions.west, directions.north],
      right: [],
      nextDir: 'east',
    },
    west: {
      left: [],
      right: [directions.west, directions.north],
      nextDir: 'south',
    },
  },
};

const second = pipe(split('\n'), map(split('')), (grid) => {
  const gridMap = new Map();
  let startingPosition;
  for (let x = 0; x < grid.length; x++) {
    const row = grid[x];
    for (let y = 0; y < row.length; y++) {
      const col = row[y];
      if (col === 'S') startingPosition = [x, y];
      gridMap.set([x, y].toString(), col);
    }
  }

  const findAcceptableStartingDirections = (pos) =>
    pipe(
      filter(([dirName, dir]) =>
        acceptableElements[dirName].includes(
          gridMap.get(translate(pos, dir).toString())
        )
      ),
      map(([dirName, dir]) => dirName)
    )(Object.entries(directions));

  const loop = new Map();
  loop.set(startingPosition.toString(), 0);
  const toVisit = [
    [
      startingPosition,
      0,
      findAcceptableStartingDirections(startingPosition)[0],
    ],
  ];

  let toScanLeft = [];
  const scannedLeft = new Set();
  let toScanRight = [];
  const scannedRight = new Set();

  const visit = ([pos, distance, currDir]) => {
    loop.set(pos.toString(), distance);

    const nextPos = translate(pos, directions[currDir]);

    if (loop.has(nextPos.toString())) return;

    const { left, right, nextDir } =
      scanDirections[gridMap.get(nextPos.toString())][currDir];

    left.forEach((dir) => {
      toScanLeft.push(translate(nextPos, dir));
    });
    right.forEach((dir) => {
      toScanRight.push(translate(nextPos, dir));
    });
    toVisit.push([nextPos, distance + 1, nextDir]);
  };

  const scan = (pos, visitedPos, toVisitPos) => {
    if (!gridMap.has(pos.toString())) return;
    if (loop.has(pos.toString())) return;
    if (visitedPos.has(pos.toString())) return;

    visitedPos.add(pos.toString());
    Object.values(directions).forEach((dir) =>
      toVisitPos.push(translate(pos, dir))
    );
  };

  while (toVisit.length) {
    const nexToVisit = toVisit.shift();
    visit(nexToVisit);
  }

  toScanLeft = toScanLeft
    .filter((pos) => !loop.has(pos.toString()))
    .filter((pos) => gridMap.has(pos.toString()));
  toScanRight = toScanRight
    .filter((pos) => !loop.has(pos.toString()))
    .filter((pos) => gridMap.has(pos.toString()));

  while (toScanLeft.length) {
    const nexToVisit = toScanLeft.shift();
    scan(nexToVisit, scannedLeft, toScanLeft);
  }

  while (toScanRight.length) {
    const nexToVisit = toScanRight.shift();
    scan(nexToVisit, scannedRight, toScanRight);
  }

  return [gridMap.size, loop.size, scannedLeft.size, scannedRight.size];
});

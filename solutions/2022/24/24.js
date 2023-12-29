import {
  reduce,
  translate,
  sequence,
  lcm,
  pipe,
  split,
  map,
  log,
} from '../../../utils.js';

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, 0], // stay
  [0, -1], // left
  [-1, 0], // up
];

const skipFirstAndLast = (arr) => arr.slice(1, arr.length - 1);

const extractBlizzards = reduce([], (acc, row, x) =>
  reduce(acc, (innerAcc, point, y) => {
    if (point === '^')
      innerAcc.push([
        [x, y],
        [-1, 0],
      ]);
    if (point === '>')
      innerAcc.push([
        [x, y],
        [0, 1],
      ]);
    if (point === '<')
      innerAcc.push([
        [x, y],
        [0, -1],
      ]);
    if (point === 'v')
      innerAcc.push([
        [x, y],
        [1, 0],
      ]);

    return innerAcc;
  })(row)
);

const moveBlizzard = ([rows, cols, blizzards]) =>
  blizzards.map(([spot, dir]) => {
    const [x, y] = translate(spot, dir);

    return [[(x + rows) % rows, (y + cols) % cols], dir];
  });

const findFreePostitions = ([rows, cols, blizzards]) => {
  const allSpots = sequence(0, rows - 1).flatMap((x) =>
    sequence(0, cols - 1).map((y) => [x, y])
  );
  const takenSpots = new Set(
    blizzards.map(([spot, directions]) => spot.toString())
  );
  return new Set(
    [
      [-1, 0],
      [rows, cols - 1],
      ...allSpots.filter((spot) => !takenSpots.has(spot.toString())),
    ].map((i) => i.toString())
  );
};

const extractFreePositions = ([rows, cols, blizzards]) => {
  const cycleLength = lcm(rows, cols);
  const blizzardPostitions = [blizzards];
  sequence(1, cycleLength - 1).forEach((i) => {
    const prevBlizzards = blizzardPostitions[i - 1];
    blizzardPostitions[i] = moveBlizzard([rows, cols, prevBlizzards]);
  });

  return [
    rows,
    cols,
    blizzardPostitions.map((blizzardPos) =>
      findFreePostitions([rows, cols, blizzardPos])
    ),
  ];
};

const findLowestTravelTime = (
  startPos,
  destinationPos,
  startMinutes,
  freePositions
) => {
  const cycleLength = freePositions.length;

  const destination = destinationPos.toString();
  const checked = new Set();
  const toCheck = [[startPos, startMinutes]];

  while (toCheck.length) {
    const [position, minute] = toCheck.shift();
    const hash = [position, minute % cycleLength].toString();

    if (checked.has(hash)) continue;

    checked.add(hash);

    if (position.toString() === destination) return minute;

    directions
      .map((dir) => translate(position, dir))
      .filter((pos) =>
        freePositions[(minute + 1) % cycleLength].has(pos.toString())
      )
      .forEach((pos) => toCheck.push([pos, minute + 1]));
  }
};

const prepareInput = pipe(
  split('\n'),
  skipFirstAndLast,
  map(split('')),
  map(skipFirstAndLast),
  (grid) => [grid.length, grid[0].length, extractBlizzards(grid)],
  extractFreePositions
);

const first = pipe(prepareInput, ([rows, cols, freePositions]) => {
  const start = [-1, 0];
  const finish = [rows, cols - 1];
  return findLowestTravelTime(start, finish, 0, freePositions);
});

const second = pipe(prepareInput, ([rows, cols, freePositions]) => {
  const start = [-1, 0];
  const finish = [rows, cols - 1];
  const firstTravelTime = findLowestTravelTime(start, finish, 0, freePositions);
  const secondTravelTime = findLowestTravelTime(
    finish,
    start,
    firstTravelTime,
    freePositions
  );
  const thirdTravelTime = findLowestTravelTime(
    start,
    finish,
    secondTravelTime,
    freePositions
  );

  return thirdTravelTime;
});

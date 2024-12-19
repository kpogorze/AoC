import {
  divideWether,
  log,
  map,
  pick,
  pipe,
  sequence,
  reduce,
  rotate,
  split,
  translate,
} from 'utils';

const directions = {
  NW: [-1, -1],
  N: [-1, 0],
  NE: [-1, 1],
  E: [0, 1],
  SE: [1, 1],
  S: [1, 0],
  SW: [1, -1],
  W: [0, -1],
};

const adjacentDirections = {
  N: ['N', 'NE', 'NW'],
  S: ['S', 'SE', 'SW'],
  E: ['E', 'NE', 'SE'],
  W: ['W', 'SW', 'NW'],
};

const debug = (elves) => {
  const maxX = Math.max(...elves.map(pick(0)));
  const minX = Math.min(...elves.map(pick(0)));
  const maxY = Math.max(...elves.map(pick(1)));
  const minY = Math.min(...elves.map(pick(1)));

  const level = sequence(minX, maxX)
    .map((x) =>
      sequence(minY, maxY)
        .map((y) =>
          elves.map((e) => e.toString()).includes([x, y].toString()) ? '#' : '.'
        )
        .join('')
    )
    .join('\n');

  log(level);

  return elves;
};

const calculateScore = (elves) => {
  const maxX = Math.max(...elves.map(pick(0)));
  const minX = Math.min(...elves.map(pick(0)));
  const maxY = Math.max(...elves.map(pick(1)));
  const minY = Math.min(...elves.map(pick(1)));

  return (maxX - minX + 1) * (maxY - minY + 1) - elves.length;
};

export const first = pipe(
  split('\n'),
  map(split('')),
  reduce([], (acc, row, x) =>
    reduce(acc, (innerAcc, point, y) => {
      if (point === '#') innerAcc.push([x, y]);

      return innerAcc;
    })(row)
  ),
  (elves) => {
    let elfPositions = [...elves];
    let directionOrder = ['N', 'S', 'W', 'E'];
    let occupiedPositions = new Set(elfPositions.map((e) => e.toString()));

    const needsToMove = (elfPos) =>
      Object.values(directions).some((dir) =>
        occupiedPositions.has(translate(elfPos, dir).toString())
      );
    const findMoveIntent = (elfPos) =>
      directionOrder.find((dir) =>
        adjacentDirections[dir].every(
          (d) =>
            !occupiedPositions.has(translate(elfPos, directions[d]).toString())
        )
      );
    const moveElves = (elvesToMove) => {
      let moveIntentions = new Set();
      let conflictPositions = new Set();

      const fistStageResult = elvesToMove
        .map((elfPos) => [elfPos, findMoveIntent(elfPos)])
        .map(([elfPos, direction]) => [
          elfPos,
          translate(elfPos, directions[direction] ?? [0, 0]),
        ]);

      fistStageResult.forEach(([elfPos, nextPos]) => {
        if (moveIntentions.has(nextPos.toString())) {
          conflictPositions.add(nextPos.toString());
        } else {
          moveIntentions.add(nextPos.toString());
        }
      });

      return fistStageResult.map(([elfPos, nextPos]) =>
        conflictPositions.has(nextPos.toString()) ? elfPos : nextPos
      );
    };

    let rounds = 0;
    let firstSolution;

    while (true) {
      if (rounds === 10) firstSolution = calculateScore(elfPositions);
      const [elvesToMove, doneEleves] = divideWether(needsToMove)(elfPositions);

      if (doneEleves.length === elfPositions.length) break;

      elfPositions = [...doneEleves, ...moveElves(elvesToMove)];
      occupiedPositions = new Set(elfPositions.map((e) => e.toString()));
      directionOrder = rotate(1)(directionOrder);
      rounds++;
    }

    return [firstSolution, rounds + 1];
  }
);

export const second = first;

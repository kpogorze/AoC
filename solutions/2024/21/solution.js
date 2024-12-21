import {
  eq,
  exec,
  map,
  memoize,
  min,
  pairwise,
  pipe,
  splitByLine,
  spreadGrid,
  sum,
  toInt,
} from 'utils';

const numpad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [, '0', 'A'],
];
const numpadPoints = spreadGrid(numpad);

const arrowPad = [
  [, '^', 'A'],
  ['<', 'v', '>'],
];

const arrowPadPoints = spreadGrid(arrowPad);

const numpadX = 3,
  numpadY = 2,
  numpadMissing = [3, 0];
const arrowPadX = 1,
  arrowPadY = 2,
  arrowPadMissing = [0, 0];

const parseInput = pipe(splitByLine);

/** @type {(from: string, to: string, iter: number) => number} */
const cost = memoize((from, to, iter) => {
  let isNumpad = false;
  if ('0123456789'.includes(from) || '0123456789'.includes(to)) {
    isNumpad = true;
  }
  let fromPos = (isNumpad ? numpadPoints : arrowPadPoints).find(([, el]) =>
    eq(el, from)
  )?.[0];
  let toPos = (isNumpad ? numpadPoints : arrowPadPoints).find(([, el]) =>
    eq(el, to)
  )?.[0];

  if (fromPos === undefined || toPos === undefined) {
    fromPos = numpadPoints.find(([, el]) => eq(el, from))?.[0];
    toPos = numpadPoints.find(([, el]) => eq(el, to))?.[0];
  }

  const xDiff = toPos[0] - fromPos[0];
  const yDiff = toPos[1] - fromPos[1];
  if (iter === 1) {
    return Math.abs(xDiff) + Math.abs(yDiff) + 1;
  } else {
    const xDir = xDiff === 0 ? xDiff : xDiff / Math.abs(xDiff);
    const yDir = yDiff === 0 ? yDiff : yDiff / Math.abs(yDiff);

    const xEl = xDir === -1 ? '^' : 'v';
    const yEl = yDir === -1 ? '<' : '>';

    const toCheck = [];

    if (
      !eq([toPos[0], fromPos[1]], isNumpad ? numpadMissing : arrowPadMissing)
    ) {
      toCheck.push([
        'A',
        ...Array.from({ length: Math.abs(xDiff) }).map(() => xEl),
        ...Array.from({ length: Math.abs(yDiff) }).map(() => yEl),
        'A',
      ]);
    }
    if (
      !eq([fromPos[0], toPos[1]], isNumpad ? numpadMissing : arrowPadMissing)
    ) {
      toCheck.push([
        'A',
        ...Array.from({ length: Math.abs(yDiff) }).map(() => yEl),
        ...Array.from({ length: Math.abs(xDiff) }).map(() => xEl),
        'A',
      ]);
    }

    return exec(
      toCheck,
      map(pairwise),
      map(map(([a, b]) => cost(a, b, iter - 1))),
      map(sum),
      min
    );
  }
});

export const first = pipe(
  parseInput,
  (input) =>
    exec(
      input,
      map((code) => ['A', ...code]),
      map(pairwise),
      map(map(([from, to]) => cost(from, to, 3))),
      map(sum),
      map((el, i) => el * toInt(input[i].slice(0, 3)))
    ),
  sum
);

export const second = pipe(
  parseInput,
  (input) =>
    exec(
      input,
      map((code) => ['A', ...code]),
      map(pairwise),
      map(map(([from, to]) => cost(from, to, 26))),
      map(sum),
      map((el, i) => el * toInt(input[i].slice(0, 3)))
    ),
  sum
);

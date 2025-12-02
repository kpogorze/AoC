import { log, map, pipe, splitByLine, toInt } from 'utils';

const parseInput = pipe(splitByLine);

export const first = pipe(
  parseInput,
  map((command) => {
    const dir = command[0];
    const value = toInt(command.slice(1));
    return dir === 'L' ? -value : value;
  }),
  (directions) => {
    let position = 50;
    let res = 0;

    for (const move of directions) {
      position = (position + move + 100) % 100;
      if (position === 0) {
        res += 1;
      }
    }
    return res;
  }
);

export const second = pipe(
  parseInput,
  map((command) => {
    const dir = command[0];
    const value = toInt(command.slice(1));
    return dir === 'L' ? -value : value;
  }),
  log,
  (directions) => {
    let position = 50;
    let res = 0;

    for (const move of directions) {
      console.log(position);
      res += Math.floor(Math.abs(move) / 100);

      const abs_pos = position + (move % 100);
      if (abs_pos >= 100) {
        res += 1;
      }
      if (abs_pos <= 0 && position !== 0) res += 1;

      position = (abs_pos + 100) % 100;
    }
    return res;
  }
);

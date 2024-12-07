import { filter, map, pipe, splitByLine, start, sum, toInts } from 'utils';

const parseInput = pipe(splitByLine, map(toInts));

export const first = pipe(
  parseInput,
  filter(([tested, ...rest], i) => {
    const toCheck = [rest];

    while (toCheck.length) {
      const [res, ...operands] = toCheck.shift();

      if (operands.length === 0) {
        if (res === tested) return true;
        continue;
      }

      toCheck.push([res + operands[0], ...operands.slice(1)]);
      toCheck.push([res * operands[0], ...operands.slice(1)]);
    }

    return false;
  }),
  map(start),
  sum
);

export const second = pipe(
  parseInput,
  filter(([tested, ...rest], i) => {
    const toCheck = [rest];

    while (toCheck.length) {
      const [res, ...operands] = toCheck.shift();

      if (res > tested) continue;

      if (operands.length === 1) {
        if (res + operands[0] === tested) return true;
        if (res * operands[0] === tested) return true;
        if (parseInt(`${res}${operands[0]}`) === tested) return true;
        continue;
      }

      toCheck.push([res + operands[0], ...operands.slice(1)]);
      toCheck.push([res * operands[0], ...operands.slice(1)]);
      toCheck.push([parseInt(`${res}${operands[0]}`), ...operands.slice(1)]);
    }

    return false;
  }),
  map(start),
  sum
);

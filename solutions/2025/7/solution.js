import { pipe, sequence, splitByLine, sum } from 'utils';

const parseInput = pipe(splitByLine);

export const first = pipe(parseInput, ([first, ...rest]) => {
  const beams = Object.fromEntries(
    sequence(0, first.length - 1).map((n) => [n, 0])
  );

  let res = 0;

  beams[first.indexOf('S')] = 1;

  rest.forEach((line) => {
    line.split('').forEach((char, index) => {
      if (char === '^' && beams[index] > 0) {
        res++;
        beams[index - 1] = 1;
        beams[index + 1] = 1;
        beams[index] = 0;
      }
    });
  });

  return res;
});

export const second = pipe(parseInput, ([first, ...rest]) => {
  const beams = Object.fromEntries(
    sequence(0, first.length - 1).map((n) => [n, 0])
  );

  beams[first.indexOf('S')] = 1;

  rest.forEach((line) => {
    line.split('').forEach((char, index) => {
      if (char === '^') {
        beams[index - 1] += beams[index];
        beams[index + 1] += beams[index];
        beams[index] = 0;
      }
    });
  });

  return sum(Object.values(beams));
});

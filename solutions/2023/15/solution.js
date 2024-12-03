import { map, pipe, sequence, reduce, split, sum } from 'utils';

const calculateHash = reduce(
  0,
  (acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256
);

export const first = pipe(split(','), map(split('')), map(calculateHash), sum);

export const second = pipe(
  split(','),
  (arr) => {
    const boxes = sequence(1, 256).map(() => []);

    for (const el of arr) {
      if (el.includes('=')) {
        const [label, focal] = el.split('=');
        const hash = calculateHash(label.split(''));
        const labelIdx = boxes[hash].findIndex(([l]) => l === label);
        if (labelIdx === -1) {
          boxes[hash].push([label, focal]);
        } else {
          boxes[hash][labelIdx] = [label, focal];
        }
      } else {
        const label = el.slice(0, -1);
        const hash = calculateHash(label.split(''));
        const labelIdx = boxes[hash].findIndex(([l]) => l === label);
        if (labelIdx !== -1) {
          boxes[hash].splice(labelIdx, 1);
        }
      }
    }

    return boxes;
  },
  map(map(([label, focal], i) => focal * (i + 1))),
  map(sum),
  map((el, i) => el * (i + 1)),
  sum
);

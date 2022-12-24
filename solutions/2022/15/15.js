import { map, pipe, split, toInt } from "../../../utils.js";

const rowToCheck = 2000000;

const first = pipe(
  split('\n'),
  map(s => Array.from(s.matchAll(/[-+]?\d+/g))),
  map(map(toInt)),
  map(([sx, sy, bx, by]) => [sx, sy, bx, by, Math.abs(sx - bx) + Math.abs(sy - by)]),
  sensors => {
    const forbidden = new Set();

    sensors.forEach(([x, y, bx, by, distance]) => {
      const distanceToRow = Math.abs(y - rowToCheck)
      for (let i = 0; i <= distance - distanceToRow; i++) {
        forbidden.add(x + i);
        forbidden.add(x - i);
      }
    })

    sensors.forEach(([x, y, bx, by, distance]) => {
      if (by === rowToCheck) forbidden.delete(bx);
    })

    return forbidden
  },
);

const upperBound = 4000000;

const second = pipe(
  split('\n'),
  map(s => Array.from(s.matchAll(/[-+]?\d+/g))),
  map(map(toInt)),
  map(([sx, sy, bx, by]) => [sx, sy, Math.abs(sx - bx) + Math.abs(sy - by)]),
  sensors => {
    for (let i = 0; i < upperBound; i++) {
      const forbiddenRanges = [[-2, -1], [upperBound + 1, upperBound + 2]];

      sensors.forEach(([x, y, distance]) => {
        const distanceToRow = Math.abs(y - i)
        const diff = distance - distanceToRow;
        if (diff >= 0) {
          forbiddenRanges.push([x - diff, x + diff])
        }
      });

      forbiddenRanges.sort((a, b) => a[0] - b[0]);

      let rangeSum = forbiddenRanges[0];
      for (let j = 1; j < forbiddenRanges.length; j++) {
        const currentRange = forbiddenRanges[j];
        if (currentRange[0] > rangeSum[1] + 1) return [rangeSum[1] + 1, i]

        rangeSum = [Math.min(currentRange[0], rangeSum[0]), Math.max(currentRange[1], rangeSum[1])]
      }
    }
  },
  ([x, y]) => x * 4000000 + y,
);

import {
  asc,
  map,
  max,
  min,
  pick,
  pipe,
  sequence,
  sort,
  split,
  sum,
  translate,
} from 'utils';

const directions = {
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
  U: [-1, 0],
};

const calculateSurfaceArea = (digs) => {
  let currentPos = [0, 0];
  const edges = [];

  digs.forEach(([dir, len]) => {
    const nextPos = translate(
      currentPos,
      dir.map((el) => el * len)
    );
    edges.push([currentPos, nextPos]);
    currentPos = nextPos;
  });

  const minX = min(edges.flat().map(pick(0)));
  const maxX = max(edges.flat().map(pick(0)));

  let rangesInShape = [];

  const rangesLengths = (ranges) =>
    sum(ranges.map(([from, to]) => Math.abs(to - from) + 1));

  let total = 0;

  sequence(minX, maxX).forEach((x) => {
    const horizontalEdges = edges
      .filter(([from, to]) => from[0] === x && to[0] === x)
      .map(map(pick(1)))
      .map(sort(asc));

    if (horizontalEdges.length) {
      for (const edge of horizontalEdges) {
        const isConnectedToAnyRange = rangesInShape.some(
          (rang) => rang.includes(edge[0]) || rang.includes(edge[1])
        );
        if (isConnectedToAnyRange) {
          rangesInShape = rangesInShape
            .map((rang) => {
              if (edge[0] === rang[0] && edge[1] === rang[1]) {
                total += Math.abs(edge[1] - edge[0]) + 1;
                return undefined;
              }
              if (edge[0] === rang[0]) {
                total += Math.abs(edge[1] - edge[0]);
                return [edge[1], rang[1]];
              }
              if (edge[0] === rang[1]) {
                return [rang[0], edge[1]];
              }
              if (edge[1] === rang[0]) {
                return [edge[0], rang[1]];
              }
              if (edge[1] === rang[1]) {
                total += Math.abs(edge[1] - edge[0]);
                return [rang[0], edge[0]];
              }
              return rang;
            })
            .filter(Boolean);
        } else {
          const isContainedInAnyRange = rangesInShape.some(
            (rang) => rang[0] < edge[0] && rang[1] > edge[1]
          );

          if (!isContainedInAnyRange) {
            rangesInShape.push(edge);
          } else {
            const rangeToSplitIdx = rangesInShape.findIndex(
              (rang) => rang[0] < edge[0] && rang[1] > edge[1]
            );
            const rangeToSplit = rangesInShape[rangeToSplitIdx];
            rangesInShape.splice(
              rangeToSplitIdx,
              1,
              [rangeToSplit[0], edge[0]],
              [edge[1], rangeToSplit[1]]
            );

            total += Math.abs(edge[1] - edge[0] - 1);
          }
        }
      }

      rangesInShape.sort(([a], [b]) => a - b);

      const consolidated = [rangesInShape.shift()];

      while (rangesInShape.length) {
        const curr = rangesInShape.shift();
        if (consolidated.at(-1)[1] >= curr[0]) {
          consolidated.at(-1)[1] = curr[1];
        } else {
          consolidated.push(curr);
        }
      }

      rangesInShape = consolidated.filter(Boolean);
    }

    total += rangesLengths(rangesInShape);
  });

  return total;
};

const first = pipe(split('\n'), map(split(' ')), calculateSurfaceArea);

const second = pipe(
  split('\n'),
  map(split(' ')),
  map(([, , real]) => real.slice(2, -1)),
  map((el) => [
    Object.values(directions)[el.at(-1)],
    parseInt(el.slice(0, -1), 16),
  ]),
  calculateSurfaceArea
);

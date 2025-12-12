import {
  bfs,
  dfs,
  end,
  eq,
  exec,
  map,
  mapObject,
  multiply,
  pipe,
  split,
  splitByLine,
  sum,
} from 'utils';

const parseInput = pipe(
  splitByLine,
  map(split(' ')),
  map(([from, ...to]) => [from.slice(0, -1), to]),
  Object.fromEntries,
  (a) => ((a['out'] = []), a)
);

export const first = pipe(parseInput, (connections) => {
  return bfs({
    toCheck: [['you']],
    stopCondition: (path) => (end(path) === 'out' ? path : null),
    traversalFn: (path) =>
      connections[end(path)].map((next) => [...path, next]),
  }).length;
});

export const second = pipe(parseInput, (connections) => {
  const calculatePaths = (from, to) => {
    const subGraphInputs = exec(
      connections,
      mapObject(([node]) => [node, 0])
    );

    dfs({
      toCheck: [from],
      stopCondition: (node) => (eq(node, to) ? node : null),
      traversalFn: (node) => {
        const nextNodes = connections[node];

        nextNodes.forEach((next) => {
          subGraphInputs[next]++;
        });

        return nextNodes;
      },
    });

    const pathCombinations = mapObject(([from]) => [from, []])(connections);

    pathCombinations[from].push(1);

    bfs({
      toCheck: [from],
      stopCondition: (node) => (node === to ? pathCombinations[to] : null),
      traversalFn: (node) => {
        const nextNodes = connections[node];

        nextNodes.forEach((next) => {
          pathCombinations[next].push(sum(pathCombinations[node]));
        });

        return nextNodes.filter(
          (n) => pathCombinations[n].length === subGraphInputs[n]
        );
      },
    });

    return pathCombinations[to];
  };

  return exec(
    [
      calculatePaths('svr', 'fft'),
      calculatePaths('fft', 'dac'),
      calculatePaths('dac', 'out'),
    ],
    map(sum),
    multiply
  );
});

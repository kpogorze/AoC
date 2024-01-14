import { map, pipe, reduce, split, toInt } from 'utils';

const memoize = (fn) => {
  let hit = 0,
    miss = 0;
  const results = new Map();
  return (...arg) => {
    const hash = arg.toString();

    if (results.has(hash)) {
      hit++;
      return results.get(hash);
    }

    miss++;
    const res = fn(...arg);
    results.set(hash, res);

    return res;
  };
};

const parseInput = pipe(
  split('\n'),
  map((s) => s.replace('Valve ', '')),
  map((s) => s.replace(/,/g, '')),
  map((s) => s.replace(' has flow rate=', ' ')),
  map((s) => s.replace('; tunnels lead to valves', '')),
  map((s) => s.replace('; tunnels lead to valve', '')),
  map((s) => s.replace('; tunnel leads to valves', '')),
  map((s) => s.replace('; tunnel leads to valve', '')),
  map(split(' ')),
  reduce({}, (acc, arr) => {
    acc[arr[0]] = [toInt(arr[1]), arr.slice(2)];
    return acc;
  })
);

const toNonZeroValvesGraph = (valves) => {
  const actualValves = Object.entries(valves)
    .filter(([name, [pressure]]) => pressure)
    .map(([name]) => name);

  const timeToOtherValves = (valveName) => {
    const valveDistances = {};
    const visited = new Set([valveName]);
    let toCheck = [...valves[valveName][1].map((valve) => [valve, 1])];
    while (toCheck.length) {
      const [currentValve, distance] = toCheck.shift();
      const [pressure, otherValves] = valves[currentValve];
      visited.add(currentValve);
      if (pressure) {
        valveDistances[currentValve] = distance;
      }

      toCheck = toCheck.concat(
        otherValves.filter((n) => !visited.has(n)).map((n) => [n, distance + 1])
      );
    }

    return valveDistances;
  };

  return Object.fromEntries([
    ['AA', [valves['AA'][0], timeToOtherValves('AA')]],
    ...actualValves.map((valveName) => [
      valveName,
      [valves[valveName][0], timeToOtherValves(valveName)],
    ]),
  ]);
};

const first = pipe(parseInput, toNonZeroValvesGraph, (graph) => {
  const maxValue = (valveName, valvesToCheck, remainingTime) => {
    const [pressure, timeToOtherValves] = graph[valveName];
    const remainingValvesToCheck = valvesToCheck.filter(
      (valve) => valve !== valveName
    );
    const reachableValves = valvesToCheck.filter(
      (valve) => timeToOtherValves[valve] + 1 < remainingTime
    );

    const maxFromReachableValves = reachableValves.length
      ? Math.max(
          ...reachableValves.map((v) =>
            maxValue(
              v,
              remainingValvesToCheck,
              remainingTime - 1 - timeToOtherValves[v]
            )
          )
        )
      : 0;

    return pressure * (remainingTime - 1) + maxFromReachableValves;
  };

  return maxValue(
    'AA',
    Object.keys(graph).filter((k) => k !== 'AA'),
    31
  );
});

const second = pipe(parseInput, toNonZeroValvesGraph, (graph) => {
  // very slow, for proper solution remove slice at the end of line
  const valvesToCheck = Object.keys(graph)
    .filter((valve) => valve !== 'AA')
    .sort((a, b) => graph[b][0] - graph[a][0])
    .slice(0, 10);
  const time = 26;
  let bestScore = 0;
  let bestPath;

  const calculateScore = memoize((path, timeLeft = time + 1) => {
    const [current, ...rest] = path;
    const [pressure, distances] = graph[current];

    return (
      pressure * (timeLeft - 1) +
      (rest.length
        ? calculateScore(rest, timeLeft - 1 - distances[rest[0]])
        : 0)
    );
  });

  const calculateCombinedScore = ([first, second]) =>
    calculateScore(first) + calculateScore(second);

  const timeIncrement = (path, to) => graph[path[path.length - 1]][1][to] + 1;

  const checkBestPath = ([
    firstPath,
    secondPath,
    firstTimePassed = 0,
    secondTimePassed = 0,
  ]) => {
    const remainingValves = valvesToCheck.filter(
      (valve) => !(firstPath.includes(valve) || secondPath.includes(valve))
    );
    const valvesAvailableToFirst = remainingValves
      .map((valve) => [
        valve,
        firstTimePassed + timeIncrement(firstPath, valve),
      ])
      .filter(([valve, newTime]) => newTime < time);
    const valvesAvailableToSecond = remainingValves
      .map((valve) => [
        valve,
        secondTimePassed + timeIncrement(secondPath, valve),
      ])
      .filter(([valve, newTime]) => newTime < time);

    if (valvesAvailableToFirst.length + valvesAvailableToSecond.length === 0) {
      const finalPath = [firstPath, secondPath];
      const finalScore = calculateCombinedScore(finalPath);
      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestPath = finalPath;
      }
    }

    let pathsToCheck = [
      ...valvesAvailableToFirst.map(([valve, newTime]) => [
        [...firstPath, valve],
        secondPath,
        newTime,
        secondTimePassed,
      ]),
      ...valvesAvailableToSecond.map(([valve, newTime]) => [
        firstPath,
        [...secondPath, valve],
        firstTimePassed,
        newTime,
      ]),
    ];

    pathsToCheck.forEach(checkBestPath);
  };

  valvesToCheck
    .flatMap((a, i) => valvesToCheck.slice(i + 1).map((b) => [a, b]))
    .map(([a, b]) => [
      ['AA', a],
      ['AA', b],
      graph['AA'][1][a],
      graph['AA'][1][b],
    ])
    .forEach(checkBestPath);

  return [bestPath, bestScore];
});

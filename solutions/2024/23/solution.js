import {
  cartesian,
  dfs,
  exec,
  filter,
  flatMap,
  K,
  map,
  pipe,
  pluck,
  scan,
  split,
  splitByLine,
  start,
  unique,
} from 'utils';

const parseInput = pipe(splitByLine, map(split('-')), (connections) => {
  /** @type {Record<string, string[]>} */
  const conMap = {};

  connections.forEach(([from, to]) => {
    if (!conMap[from]) {
      conMap[from] = [];
    }
    conMap[from].push(to);
    if (!conMap[to]) {
      conMap[to] = [];
    }
    conMap[to].push(from);
  });

  return conMap;
});

export const first = pipe(
  parseInput,
  (cons) =>
    exec(
      Object.entries(cons),
      filter(([from, to]) => from.startsWith('t')),
      flatMap(([from, to]) =>
        cartesian(to, to)
          .filter(([a, b]) => cons[a].includes(b))
          .map(([a, b]) => [from, a, b].toSorted().join())
      )
    ),
  unique,
  pluck('length')
);

export const second = pipe(
  parseInput,
  (cons) => {
    const conSets = new Set();
    const checked = new Set();
    const nodes = Object.keys(cons);

    dfs({
      toCheck: nodes.map((n) => [n]),
      stopCondition: K(null),
      traversalFn: (current) => {
        checked.add(current.join());
        const candidates = exec(
          current,
          map((n) => new Set(cons[n])),
          scan((a, b) => a.intersection(b))
        )
          .values()
          .toArray()
          .map((n) => [...current, n].toSorted());

        if (candidates.length === 0) {
          conSets.add(current.join());
        }

        return candidates.filter((c) => !checked.has(c.join()));
      },
      canBacktrack: true,
    });

    return conSets
      .values()
      .toArray()
      .toSorted((a, b) => b.length - a.length);
  },
  start
);

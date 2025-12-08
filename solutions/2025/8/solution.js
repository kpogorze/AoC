import {
  apply,
  asc,
  cartesian,
  desc,
  exec,
  filter,
  map,
  multiply,
  pipe,
  pluck,
  sort,
  splitByLine,
  sub,
  sum,
  take,
  toInts,
  zip,
} from 'utils';

const parseInput = pipe(
  splitByLine,
  map((s, i) => [i + 1, toInts(s)]),
  (a) => cartesian(a, a),
  map(([[y1, row1], [y2, row2]]) => {
    const distance = exec(
      zip(row1, row2),
      map(apply(sub)),
      map((n) => n * n),
      sum,
      Math.sqrt
    );
    return [y1, y2, distance, row1, row2];
  }),
  filter(([, , d]) => d !== 0),
  sort(([, , d1], [, , d2]) => asc(d1, d2)),
  filter((_, i) => i % 2 === 0)
);

export const first = pipe(
  parseInput,
  take(1000),
  (connections) => {
    /** @type {Set<number>[]} */
    let circuits = [];

    for (const [y1, y2] of connections) {
      const existingCircuits = circuits.filter(
        (circuit) => circuit.has(y1) || circuit.has(y2)
      );
      const disconnectedCircuits = circuits.filter(
        (circuit) => !circuit.has(y1) && !circuit.has(y2)
      );
      const newCircuit =
        existingCircuits.length === 0
          ? new Set([y1, y2])
          : existingCircuits.reduce((acc, circuit) => {
              return acc.union(circuit);
            }, new Set([y1, y2]));

      circuits = [...disconnectedCircuits, newCircuit];
    }

    return circuits;
  },
  map(pluck('size')),
  sort(desc),
  take(3),
  multiply
);

export const second = pipe(parseInput, (connections) => {
  /** @type {Set<number>[]} */
  let circuits = [];

  for (const [y1, y2, distance, [x1], [x2]] of connections) {
    const existingCircuits = circuits.filter(
      (circuit) => circuit.has(y1) || circuit.has(y2)
    );
    const disconnectedCircuits = circuits.filter(
      (circuit) => !circuit.has(y1) && !circuit.has(y2)
    );
    const newCircuit =
      existingCircuits.length === 0
        ? new Set([y1, y2])
        : existingCircuits.reduce((acc, circuit) => {
            return acc.union(circuit);
          }, new Set([y1, y2]));

    if (newCircuit.size === 1000) {
      return x1 * x2;
    }

    circuits = [...disconnectedCircuits, newCircuit];
  }

  return circuits;
});

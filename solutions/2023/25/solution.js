import { count, K, map, multiply, pipe, split } from 'utils';

// solved by hand lol
// TODO: try solutions to find them

const edgesToCut = [
  ['zxb', 'zkv'],
  ['mtl', 'pgl'],
  ['scf', 'lkf'],
];

export const first = pipe(
  split('\n'),
  map(split(': ')),
  map(([el, nodes]) => [el, new Set(nodes.split(' '))]),
  Object.fromEntries,
  (nodes) => {
    Object.keys(nodes).forEach((node) => {
      [...nodes[node].values()].forEach((n) => {
        nodes[n] ??= new Set();
        nodes[n].add(node);
      });
    });

    return nodes;
  },
  (nodes) =>
    Object.keys(nodes).map((name) => {
      const visited = new Set([name]);
      const toCheck = [...nodes[name]].filter(
        (n) =>
          !edgesToCut.some((edge) => edge.includes(name) && edge.includes(n))
      );
      while (toCheck.length) {
        const curr = toCheck.shift();
        visited.add(curr);

        [...nodes[curr]].forEach((n) => {
          if (
            edgesToCut.some((edge) => edge.includes(curr) && edge.includes(n))
          ) {
            return;
          }
          if (!visited.has(n)) {
            toCheck.push(n);
          }
        });
      }

      return visited.size;
    }),
  count,
  Object.keys,
  multiply
);

export const second = pipe(K('trud skończon'));

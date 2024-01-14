import { lcm, pipe, reduce, split } from 'utils';

const first = pipe(
  split('\n\n'),
  ([moves, connections]) => [
    moves.split(''),
    Object.fromEntries(
      connections
        .split('\n')
        .map((el) => el.split(' = '))
        .map(([node, directions]) => [
          node,
          directions.slice(1, directions.length - 1).split(', '),
        ])
    ),
  ],
  ([moves, graph]) => {
    let currentNode = 'AAA';

    let step = 1;
    while (currentNode != 'ZZZ') {
      for (const move of moves) {
        currentNode = graph[currentNode][move === 'L' ? 0 : 1];
        if (currentNode === 'ZZZ') return step;
        step++;
      }
    }
  }
);

const second = pipe(
  split('\n\n'),
  ([moves, connections]) => [
    moves.split(''),
    Object.fromEntries(
      connections
        .split('\n')
        .map((el) => el.split(' = '))
        .map(([node, directions]) => [
          node,
          directions.slice(1, directions.length - 1).split(', '),
        ])
    ),
  ],
  ([moves, graph]) => {
    let currentNodes = Object.keys(graph).filter((node) => node.endsWith('A'));

    return [
      moves.length,
      ...currentNodes.map((node) => {
        let step = 1;
        let currentNode = node;
        while (true) {
          for (const move of moves) {
            currentNode = graph[currentNode][move === 'L' ? 0 : 1];
            if (currentNode.endsWith('Z')) return step;
            step++;
          }
        }
      }),
    ];
  },
  reduce(1, (acc, curr) => lcm(acc, curr))
);

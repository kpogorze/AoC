import {
  asc,
  bfs,
  eq,
  filter,
  find,
  flatMap,
  K,
  map,
  mapFn,
  pipe,
  split,
  splitByLine,
  toInts,
} from 'utils';

const parseInput = pipe(
  splitByLine,
  map(split(' ')),
  map(
    mapFn([
      pipe(
        find((s) => s.startsWith('[')),
        (s) => s.slice(1, -1),
        split(''),
        map((c) => (c === '#' ? 1 : 0))
      ),
      pipe(
        filter((s) => s.startsWith('(')),
        map(toInts)
      ),
      pipe(
        find((s) => s.startsWith('{')),
        toInts
      ),
    ])
  )
);

export const first = pipe(
  parseInput,
  flatMap(([lights, switches, joltage], i) => {
    console.log('Processing case', i + 1);
    return bfs({
      toCheck: [{ state: lights.map(K(0)), switchList: [] }],
      returnFirst: true,
      stopCondition: ({ state, switchList }) =>
        eq(state, lights) ? switchList : null,
      traversalFn: ({ state, switchList }) => {
        return switches.flatMap((lightsToFlip, idx) => {
          if (switchList.includes(idx)) {
            return [];
          }
          const newState = [...state];
          lightsToFlip.forEach(
            (lightIdx) => (newState[lightIdx] = (newState[lightIdx] + 1) % 2)
          );
          return [
            {
              switchList: [...switchList, idx].toSorted(asc),
              state: newState,
            },
          ];
        });
      },
    });
  })
);

export const second = pipe(parseInput);

import {
  apply,
  difference,
  exec,
  filter,
  intersection,
  map,
  min,
  pick,
  pipe,
  range,
  reduce,
  scan,
  shift,
  split,
  splitEvery,
  start,
  toInts,
  union,
} from 'utils';

const parseInput = pipe(
  split('\n\n'),
  map(split('\n')),
  map(map(toInts)),
  map(filter((a) => a.length))
);

const prepareSeedPoints = pipe(
  map((point) => range(point, point + 1)),
  scan(union)
);

const prepareMappings = pipe(
  map(map(([dest, start, len]) => [range(start, start + len), dest - start]))
);

const mappedSeedRange = (seedRange, mapping) =>
  exec(
    mapping,
    map(([mappingRange, diff]) =>
      exec(mappingRange, intersection(seedRange), shift(diff))
    ),
    scan(union)
  );

const unmappedSeedRange = (seedRange, mapping) =>
  difference(seedRange, exec(mapping, map(pick(0)), scan(union)));

const passSeedRangeThroughMappings = (seedRange, mappings) =>
  reduce(
    seedRange,
    (currRange, mapping) =>
      union(
        mappedSeedRange(currRange, mapping),
        unmappedSeedRange(currRange, mapping)
      ),
    mappings
  );

const first = pipe(
  parseInput,
  ([[seeds], ...mappings]) => [
    prepareSeedPoints(seeds),
    prepareMappings(mappings),
  ],
  apply(passSeedRangeThroughMappings),
  map(start),
  min
);

const prepareSeedRanges = pipe(
  splitEvery(2),
  map(([start, len]) => [start, start + len]),
  map(apply(range)),
  scan(union)
);

const second = pipe(
  parseInput,
  ([[seeds], ...mappings]) => [
    prepareSeedRanges(seeds),
    prepareMappings(mappings),
  ],
  apply(passSeedRangeThroughMappings),
  map(start),
  min
);

import {
  filter,
  map,
  min,
  pairwise,
  pick,
  pipe,
  split,
  toInts,
} from '../../../utils.js';

const first = pipe(
  split('\n\n'),
  map(split('\n')),
  map(map(toInts)),
  map(filter((a) => a.length)),
  ([[seeds], ...mappings]) => {
    return seeds.map((seed) =>
      mappings.reduce((id, mapping) => {
        const targetRange = mapping.find(
          ([second, first, rangeLen]) => id >= first && id <= first + rangeLen
        );

        if (!targetRange) return id;

        return targetRange[0] + (id - targetRange[1]);
      }, seed)
    );
  },
  min
);

const second = pipe(
  split('\n\n'),
  map(split('\n')),
  map(map(toInts)),
  map(filter((a) => a.length)),
  ([[seeds], ...mappings]) => {
    return [
      seeds
        .map((id, i) =>
          i % 2 === 1 ? [seeds[i - 1], seeds[i - 1] + id - 1] : undefined
        )
        .filter(Boolean),
      ...mappings.map((mapping) =>
        mapping.map(([dest, source, len]) => [
          [source, source + len - 1],
          dest - source,
        ])
      ),
    ];
  },
  ([seedRanges, ...mappings]) => {
    return seedRanges.flatMap((seedRange) => {
      return mappings.reduce(
        (ranges, mapping) => {
          return ranges.flatMap(([rangeStart, rangeEnd]) => {
            const overlapping = mapping
              .filter(
                ([[sourceStart, sourceEnd]]) =>
                  !(sourceEnd < rangeStart || sourceStart > rangeEnd)
              )
              .sort(
                ([firstRange], [secondRange]) => firstRange[0] - secondRange[0]
              );

            if (overlapping.length === 0) {
              return [[rangeStart, rangeEnd]];
            }

            const mappedRange = [];

            overlapping.forEach(([[start, end], diff], i) => {
              mappedRange.push([
                Math.max(rangeStart, start) + diff,
                Math.min(rangeEnd, end) + diff,
              ]);
            });

            const [[firstRangeStart, firstRangeEnd]] = overlapping.at(0);

            if (firstRangeStart > rangeStart) {
              mappedRange.push([rangeStart, firstRangeStart - 1]);
            }

            const [[lastRangeStart, lastRangeEnd]] = overlapping.at(-1);

            if (lastRangeEnd < rangeEnd) {
              mappedRange.push([lastRangeEnd + 1, rangeEnd]);
            }

            pairwise(overlapping).forEach(
              ([[[firstStart, firstEnd]], [[secondStart, secondEnd]]]) => {
                if (firstEnd + 1 !== secondStart) {
                  mappedRange.push([firstEnd + 1, secondStart - 1]);
                }
              }
            );

            return mappedRange;
          });
        },
        [seedRange]
      );
    });
  },
  map(pick(0)),
  min
);

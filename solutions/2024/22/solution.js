import {
  apply,
  end,
  flip,
  map,
  max,
  pairwise,
  pipe,
  sequence,
  splitByLine,
  sub,
  sum,
} from 'utils';

const parseInput = pipe(
  splitByLine,
  map(BigInt),
  map((secret) => {
    let current = secret;
    const ret = [secret % 10n];

    sequence(1, 2000).forEach(() => {
      current = ((current * 64n) ^ current) % 16777216n;
      current = ((current / 32n) ^ current) % 16777216n;
      current = ((current * 2048n) ^ current) % 16777216n;
      ret.push(current);
    });

    return ret;
  }),
  map(map(Number))
);

export const first = pipe(parseInput, map(end), sum);

export const second = pipe(
  parseInput,
  map(map((el) => el % 10)),
  map((seq) => [seq, pairwise(seq).map(apply(flip(sub)))]),
  (pairs) => {
    const subSeqMap = new Map();

    pairs.forEach(([seq, diff], id) => {
      const window = diff.slice(0, 4);
      for (let i = 4; i < diff.length; i++) {
        const key = window.join();
        if (!subSeqMap.has(key)) {
          subSeqMap.set(key, []);
        }
        subSeqMap.get(key)[id] ??= seq[i];
        window.shift();
        window.push(diff[i]);
      }
    });

    return [...subSeqMap.values()];
  },
  map(sum),
  max
);

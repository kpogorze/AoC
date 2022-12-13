import { asc, count, desc, log, map, pipe, reduce, sort, split, splitByLine, sum, take, toInt } from "../../../utils.js";

const compare = (left, right) => {
  const max = Math.max(left.length, right.length)

  const coerce = val => Array.isArray(val) ? val : [val];

  for(let i = 0; i < max; i++) {
    let l = left[i], r=right[i];
    
    if(l === undefined) return true;
    if(r === undefined) return false;
    if(Number.isInteger(l) && Number.isInteger(r)) {
      if (l < r) return true;
      if (r < l) return false;
      continue;
    };

    l = coerce(l)
    r = coerce(r)
    const res = compare(l, r)

    if(res === undefined) continue;
    return res;
  }
}

const first = pipe(
  split('\n\n'),
  map(splitByLine),
  map(map(eval)),
  map(([left, right], i) => compare(left, right) ? i + 1 : undefined),
  a => a.filter(Boolean),
  sum,
);

const firstPacket = [[2]]
const secondPacket = [[6]]

const second = pipe(
  split('\n'),
  a => a.filter(Boolean),
  map(eval),
  a => [...a, firstPacket, secondPacket],
  sort((l,r) => {
    const res = compare(l,r);
    if (res === undefined) return 0;
    return res ? -1 : 1 
  }),
  a => (a.findIndex((i) => i === firstPacket)+1) * (a.findIndex((i) => i === secondPacket)+1),
);

// @ts-nocheck
/*
  Consider adding:
  - switch/if-else replacement
  - unique
*/

/*---------------------------------- FUNCTIONS ----------------------------------*/
export const I = (val) => val;

export const K = (val) => () => val;

export const pipe = (...functions) =>
  functions.reduce((combined, func) => (arg) => func(combined(arg)), I);

export const exec = (arg, ...functions) =>
  functions.reduce((result, func) => func(result), arg);

const curry = (func) =>
  function curried(...args) {
    return args.length < func.length
      ? curried.bind(null, ...args)
      : func.apply(null, args);
  };

const curryN = (arity, func) =>
  function curried(...args) {
    return args.length < arity
      ? curried.bind(null, ...args)
      : func.apply(null, args);
  };

export const apply = curry((func, args) => func.apply(null, args));

export const call =
  (...args) =>
  (func) =>
    func.call(null, ...args);

export const invoke =
  (methodName, ...args) =>
  (obj) =>
    obj[methodName](...args);

export const negate =
  (func) =>
  (...args) =>
    !func(...args);

export const flip = curry((f, a, b) => f(b, a));

export const mapFn = curry((funcList, arg) => flip(map, funcList, call(arg)));

/*---------------------------------- OBJECT ----------------------------------*/

export const pluck = curry((prop, obj) => obj[prop]);

export const log = (arg) => {
  console.log(arg);
  return arg;
};

export const copy = (arg) => structuredClone(arg);

export const mapObject = curry((mapFn, obj) =>
  Object.fromEntries(Object.entries(obj).map(mapFn))
);

export const eq = curry((a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((el, i) => eq(el, b[i]));
  }

  if (
    a != null &&
    typeof a === 'object' &&
    b != null &&
    typeof b === 'object'
  ) {
    if (a[Symbol.iterator] && b[Symbol.iterator]) {
      return eq([...a], [...b]);
    }
    return eq(Object.entries(a), Object.entries(b));
  }

  return a === b;
});

export const construct =
  (cons) =>
  (...args) =>
    new cons(...args);

/*---------------------------------- COLLECTIONS ----------------------------------*/

export const toArray = Array.from;

export const join = curry((char, arr) => arr.join(char));

export const split = curry((char, str) => str.split(char));

export const splitByLine = split('\n');

export const splitEvery = curry((n, arr) =>
  arr.length <= n ? [arr] : [arr.slice(0, n), ...splitEvery(n, arr.slice(n))]
);

export const sort = curry((compFunc, array) => array.toSorted(compFunc));

export const asc = (a, b) => a - b;

export const desc = (a, b) => b - a;

export const map = curry((func, arr) => arr.map(func));

export const find = curry((func, arr) => arr.find(func));

export const flatten = (arr) => arr.flat();

export const flatMap = curry((func, arr) => arr.flatMap(func));

export const filter = curry((func, arr) => arr.filter(func));

export const reduce = curry((init, reducer, arr) =>
  arr.reduce(reducer, copy(init))
);

export const scan = curry((func, arr) => arr.slice(1).reduce(func, arr.at(0)));

export const take = curry((index, arr) => arr.slice(0, index));

export const pick = curry((index, arr) => arr.at(index));

export const start = pick(0);

export const end = pick(-1);

export const count = reduce({}, (acc, curr) => {
  if (acc[curr]) {
    acc[curr]++;
  } else {
    acc[curr] = 1;
  }

  return acc;
});

export const pairwise = (arr) => arr.slice(1).map((val, i) => [arr[i], val]);

export const rotate = curry((amount, arr) => [
  ...arr.slice(amount % arr.length),
  ...arr.slice(0, amount % arr.length),
]);

export const reverse = (arr) => arr.toReversed();

export const divideWether = curry((func, arr) => [
  filter(func, arr),
  filter(negate(func), arr),
]);

export const zip = curry((a, b) => a.map((aElem, i) => [aElem, b[i]]));

export const hash = (...args) => exec(args, flatten, join(','));

/*---------------------------------- MATH ----------------------------------*/

export const add = curry((a, b) => a + b);

export const mul = curry((a, b) => a * b);

export const sub = curry((a, b) => a - b);

export const div = curry((a, b) => a / b);

export const sum = scan(add);

export const multiply = scan(mul);

export const max = apply(Math.max);

export const min = apply(Math.min);

export const toInt = (i) => parseInt(i, 10);

export const toInts = (s) => Array.from(s.match(/[-+]?\d+/g) ?? []).map(toInt);

export const gcd = (a, b) => {
  if (b === 0) return a;

  return a > b ? gcd(b, a % b) : gcd(a, b % a);
};

export const lcm = (a, b) => (a * b) / gcd(a, b);

export const cartesian = (a, b) => a.flatMap((ai) => b.map((bi) => [ai, bi]));

/*---------------------------------- LOGIC ----------------------------------*/

export const or = curry((a, b) => a || b);

export const and = curry((a, b) => a && b);

export const some = curry((func, arr) => arr.some(func));

export const every = curry((func, arr) => arr.every(func));

export const orElse = curry((def, val) => val ?? def);

export const match = curry((rules, val) =>
  exec(rules, find(pipe(start, call(val))), orElse([K(null)]), end, call(val))
);

/*---------------------------------- RANGES ----------------------------------*/

export const sequence = curry((from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => i + from)
);

export const range = curry((from, to) => [[from, to]]);

const isOverlapping = curry((a, b) => end(a) > start(b) && end(b) > start(a));

const isAdjacent = curry((a, b) => end(a) === start(b) || end(b) === start(a));

const simpleUnion = curry((a, b) => {
  if (isOverlapping(a, b) || isAdjacent(a, b)) {
    return [[Math.min(start(a), start(b)), Math.max(end(a), end(b))]];
  }

  return [a, b];
});

const simpleIntersection = (a, b) => {
  if (!isOverlapping(a, b)) {
    return [];
  }

  return [[Math.max(start(a), start(b)), Math.min(end(a), end(b))]];
};

const simpleDiff = (a, b) => {
  if (!isOverlapping(a, b)) {
    return [a];
  }

  return [
    [start(a), start(b)],
    [end(b), end(a)],
  ].filter(([from, to]) => from < to);
};

const consolidate = pipe(
  sort((a, b) => start(a) - start(b)),
  (rang) =>
    rang.length
      ? rang
          .slice(1)
          .reduce(
            (newRange, currPart) => [
              ...newRange.slice(0, -1),
              ...simpleUnion(end(newRange), currPart),
            ],
            [rang[0]]
          )
      : rang
);

export const union = curry((rangeA, rangeB) =>
  consolidate([...rangeA, ...rangeB])
);

export const intersection = curry((rangeA, rangeB) =>
  exec(
    [rangeA, rangeB],
    apply(cartesian),
    flatMap(apply(simpleIntersection)),
    consolidate
  )
);

export const difference = curry((rangeA, rangeB) =>
  exec(
    rangeA,
    map((a) => [[a], rangeB.filter(isOverlapping(a))]),
    flatMap(([subRange, toDiff]) =>
      reduce(
        subRange,
        (subR, diff) => subR.flatMap((r) => simpleDiff(r, diff)),
        toDiff
      )
    ),
    consolidate
  )
);

export const symmetricDifference = curry((rangeA, rangeB) =>
  union(difference(rangeA, rangeB), difference(rangeB, rangeA))
);

export const enumerate = pipe(
  map(([start, end]) => [start, end - 1]),
  map(apply(sequence)),
  flatten
);

export const shift = curry((n, rang) => rang.map(map((el) => el + n)));

/*---------------------------------- GRID ----------------------------------*/

export const getPointValue = curry((grid, [x, y]) => grid[x]?.[y]);

export const spreadGrid = (grid) =>
  grid.flatMap((row, x) => row.map((el, y) => [[x, y], el]));

export const translate = curry((point, delta) =>
  point.map((val, i) => val + delta[i])
);

export const transpose = (grid) =>
  grid[0].map((_, col) => grid.map((row) => row[col]));

export const parseGrid = pipe(split('\n'), map(split('')));

export const allNeighborDirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

export const getAllNeighbors = (point) => allNeighborDirs.map(translate(point));

export const strictNeighborDirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export const getStrictNeighbors = (point) =>
  strictNeighborDirs.map(translate(point));

export const traverse = (initFn, stopCondition, transitionFn) => (input) => {
  let currentState = initFn(input);
  while (!stopCondition(currentState)) {
    currentState = transitionFn(currentState);
  }

  return stopCondition(currentState);
};

/*---------------------------------- DS&A ----------------------------------*/

export const priorityQueue = (initElements) => {
  const activePriorities = new Set();
  const state = {};

  const add = ([el, p]) => {
    if (!state[p]) {
      state[p] = [];
    }

    state[p].push(el);
    activePriorities.add(p);
  };

  const get = () => {
    const minP = min([...activePriorities]);

    const el = state[minP].shift();

    if (state[minP].length === 0) {
      activePriorities.delete(minP);
    }

    return el;
  };

  const hasAny = () => activePriorities.size > 0;

  initElements.forEach(add);

  return {
    add,
    get,
    hasAny,
    state,
  };
};

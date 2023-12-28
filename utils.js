/*---------------------------------- FUNCTIONS ----------------------------------*/
export const pipe = (...functions) =>
  functions.reduce(
    (combined, func) => (arg) => func(combined(arg)),
    (arg) => arg
  );

export const curry = (func) =>
  function curried(...args) {
    return args.length < func.length
      ? curried.bind(null, ...args)
      : func.apply(null, args);
  };

export const apply = curry((func, args) => func.apply(null, args));

export const invoke =
  (methodName, ...args) =>
  (obj) =>
    obj[methodName](...args);

export const negate =
  (func) =>
  (...args) =>
    !func(...args);

/*---------------------------------- COLLECTIONS ----------------------------------*/

export const join = curry((char, arr) => arr.join(char));

export const split = curry((char, str) => str.split(char));

export const splitByLine = split('\n');

export const sort = curry((compFunc, array) => array.toSorted(compFunc));

export const asc = (a, b) => a - b;

export const desc = (a, b) => b - a;

export const map = curry((func, arr) => arr.map(func));

export const filter = curry((func, arr) => arr.filter(func));

export const reduce = curry((init, reducer, arr) =>
  arr.reduce(reducer, copy(init))
);

export const scan = curry((func, arr) => arr.slice(1).reduce(func, arr.at(0)));

export const take = curry((index, arr) => arr.slice(0, index));

export const pick = curry((index, arr) => arr.at(index));

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

/*---------------------------------- MATH ----------------------------------*/

export const sum = scan((sum, curr) => sum + curr);

export const multiply = scan((product, curr) => product * curr);

export const max = apply(Math.max);

export const min = apply(Math.min);

export const toInt = (i) => parseInt(i, 10);

export const toInts = (s) => Array.from(s.match(/[-+]?\d+/g) ?? []).map(toInt);

export const gcd = (a, b) => {
  if (b === 0) return a;

  return a > b ? gcd(b, a % b) : gcd(a, b % a);
};

export const lcm = (a, b) => (a * b) / gcd(a, b);

export const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => i + from);

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

/*---------------------------------- GRID ----------------------------------*/

export const eq = curry(
  (a, b) => a.every((el, i) => el === b[i]) && a.length === b.length
);

export const getPointValue = curry((grid, [x, y]) => grid[x]?.[y]);

export const spreadGrid = (grid) =>
  grid.flatMap((row, x) => row.map((el, y) => [[x, y], el]));

export const translate = curry((point, delta) =>
  point.map((val, i) => val + delta[i])
);

export const cartesian = (a, b) => a.flatMap((ai) => b.map((bi) => [ai, bi]));

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

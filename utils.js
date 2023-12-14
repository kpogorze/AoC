export const pipe = (...functions) =>
  functions.reduce(
    (combined, func) => (arg) => func(combined(arg)),
    (arg) => arg
  );

export const join = (char) => (arr) => arr.join(char);

export const split = (char) => (str) => str.split(char);

export const splitByLine = (input) => input.split('\n');

export const sort = (compFunc) => (array) => array.toSorted(compFunc);

export const asc = (a, b) => a - b;

export const desc = (a, b) => b - a;

export const max = (arr) => Math.max(...arr);

export const min = (arr) => Math.min(...arr);

export const map = (func) => (arr) => arr.map(func);

export const filter = (func) => (arr) => arr.filter(func);

export const reduce = (init, reducer) => (arr) =>
  arr.reduce(reducer, copy(init));

export const toInt = (i) => parseInt(i, 10);

export const toInts = (s) => Array.from(s.match(/[-+]?\d+/g) ?? []).map(toInt);

export const sum = reduce(0, (sum, curr) => sum + curr);

export const multiply = reduce(1, (product, curr) => product * curr);

export const take = (index) => (arr) => arr.slice(0, index);

export const pick = (index) => (arr) => arr.at(index);

export const log = (arg) => {
  console.log(arg);
  return arg;
};

export const copy = (arg) => JSON.parse(JSON.stringify(arg));

export const count = reduce({}, (acc, curr) => {
  if (acc[curr]) {
    acc[curr]++;
  } else {
    acc[curr] = 1;
  }

  return acc;
});

export const pairwise = (arr) => arr.slice(1).map((val, i) => [arr[i], val]);

export const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => i + from);

export const translate = (point, delta) =>
  point.map((val, i) => val + delta[i]);

export const rotate = (amount) => (arr) =>
  [...arr.slice(amount % arr.length), ...arr.slice(0, amount % arr.length)];

export const reverse = (arr) => arr.toReversed();

export const negate =
  (func) =>
  (...args) =>
    !func(...args);

export const divideWether = (func) => (arr) =>
  [arr.filter(func), arr.filter(negate(func))];

export const gcd = (a, b) => {
  if (b === 0) return a;

  return a > b ? gcd(b, a % b) : gcd(a, b % a);
};

export const lcm = (a, b) => (a * b) / gcd(a, b);

export const zip = (a, b) => a.map((aElem, i) => [aElem, b[i]]);

export const transpose = (grid) =>
  grid[0].map((_, col) => grid.map((row) => row[col]));

export const parseGrid = pipe(split('\n'), map(split('')));

export const invoke =
  (methodName, ...args) =>
  (obj) =>
    obj[methodName](args);

export const pipe = (...functions) => functions.reduce(
  (combined, func) => (arg) => func(combined(arg)),
  (arg) => arg
);

export const split = (char) => (str) => str.split(char);

export const splitByLine = (input) => input.split('\n');

export const sort = (compFunc) => (array) => array.sort(compFunc);

export const asc = (a, b) => a - b;

export const desc = (a, b) => b - a;

export const map = (func) => (arr) => arr.map(func);

export const reduce = (init, reducer) => (arr) => arr.reduce(reducer, copy(init));

export const toInt = (i) => parseInt(i, 10)

export const sum = reduce(0, (sum, curr) => sum += curr);

export const take = (index) => (arr) => arr.slice(0, index);

export const pick = (index) => (arr) => arr[index];

export const log = (arg) => { console.log(arg); return arg };

export const copy = (arg) => JSON.parse(JSON.stringify(arg))

export const count = reduce(
  {},
  (acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 1
    }

    return acc
  }
);
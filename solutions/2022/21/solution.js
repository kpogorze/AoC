import { pipe, split, map, toInt } from 'utils';

const parseInput = pipe(
  split('\n'),
  map(split(': ')),
  map(([a, b]) => [a, b.split(' ')])
);

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

export const first = pipe(parseInput, (monkeys) => {
  /** @type {Record<string, () => number>} */
  const monkeysToFunc = {};

  monkeys.forEach(([name, operation]) => {
    let func;

    if (operation.length === 1) {
      func = () => toInt(operation[0]);
    } else {
      let operator;
      switch (operation[1]) {
        case '+':
          operator = add;
          break;
        case '-':
          operator = sub;
          break;
        case '*':
          operator = mul;
          break;
        case '/':
          operator = div;
          break;
      }

      func = () =>
        operator(monkeysToFunc[operation[0]](), monkeysToFunc[operation[2]]());
    }

    monkeysToFunc[name] = func;
  });

  return monkeysToFunc.root();
});

export const second = pipe(parseInput, (monkeys) => {
  /** @type {Record<string, () => number | [number, number]>} */
  const monkeysToFunc = {};
  let humanValue;

  monkeys.forEach(([name, operation]) => {
    let func;

    if (name === 'root') {
      func = () => [
        monkeysToFunc[operation[0]](),
        monkeysToFunc[operation[2]](),
      ];
    } else if (name === 'humn') {
      humanValue = toInt(operation[0]);
      func = () => humanValue;
    } else if (operation.length === 1) {
      func = () => toInt(operation[0]);
    } else {
      let operator;
      switch (operation[1]) {
        case '+':
          operator = add;
          break;
        case '-':
          operator = sub;
          break;
        case '*':
          operator = mul;
          break;
        case '/':
          operator = div;
          break;
      }

      func = () =>
        operator(monkeysToFunc[operation[0]](), monkeysToFunc[operation[2]]());
    }

    monkeysToFunc[name] = func;
  });

  const initHumanValue = humanValue;
  const [left, right] = monkeysToFunc.root();
  let nextIntLeft;
  let increment = 0;
  do {
    humanValue++;
    increment++;
    nextIntLeft = monkeysToFunc.root()[0];
  } while (Math.floor(nextIntLeft) !== nextIntLeft);

  const valueIncrement = nextIntLeft - left;

  return ((right - left) / valueIncrement) * increment + initHumanValue;
});

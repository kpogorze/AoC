import {
  copy,
  log,
  map,
  multiply,
  pipe,
  split,
  sum,
  toInt,
  toInts,
} from '../../../utils.js';

const input = await fetch('./input.txt').then((response) => response.text());

const before = performance.now();

const first = pipe(
  split('\n\n'),
  map(split('\n')),
  ([rawWorkflows, parts]) => [
    rawWorkflows
      .map((raw) => raw.split('{'))
      .map(([name, rules]) => [name, rules.slice(0, -1).split(',')])
      .map(([name, rules]) => [name, rules.map((rule) => rule.split(':'))]),
    parts.map(toInts),
  ],
  ([workflows, parts]) => {
    let currentPart = [];
    const accepted = [];
    const rejected = [];

    const workflowsFunctions = {
      x: ([x, m, a, s]) => x,
      m: ([x, m, a, s]) => m,
      a: ([x, m, a, s]) => a,
      s: ([x, m, a, s]) => s,
      A: (part) => accepted.push(part),
      R: (part) => rejected.push(part),
    };

    workflows.forEach(([name, rules]) => {
      workflowsFunctions[name] = (part) => {
        for (const rule of rules) {
          if (rule.length === 1) {
            return workflowsFunctions[rule[0]](part);
          } else {
            const [check, dest] = rule;
            if (check.includes('<')) {
              const [checkFunc, checkValue] = check.split('<');
              if (workflowsFunctions[checkFunc](part) < toInt(checkValue)) {
                return workflowsFunctions[dest](part);
              }
            }
            if (check.includes('>')) {
              const [checkFunc, checkValue] = check.split('>');
              if (workflowsFunctions[checkFunc](part) > toInt(checkValue)) {
                return workflowsFunctions[dest](part);
              }
            }
          }
        }
      };
    });

    parts.forEach((part) => workflowsFunctions['in'](part));

    return accepted;
  },
  map(sum),
  sum
);

const second = pipe(
  split('\n\n'),
  map(split('\n')),
  ([rawWorkflows]) =>
    rawWorkflows
      .map((raw) => raw.split('{'))
      .map(([name, rules]) => [name, rules.slice(0, -1).split(',')])
      .map(([name, rules]) => [name, rules.map((rule) => rule.split(':'))]),
  (workflows) => {
    const accepted = [];
    const rejected = [];

    const workflowsFunctions = {
      A: (part) => {
        accepted.push(copy(part));
      },
      R: (part) => {
        rejected.push(copy(part));
      },
    };

    const initRanges = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    };

    workflows.forEach(([name, rules]) => {
      workflowsFunctions[name] = (ranges) => {
        if (Object.values(ranges).some(([a, b]) => b - a < 0)) {
          return;
        }
        const currentRanges = copy(ranges);
        for (const rule of rules) {
          if (rule.length === 1) {
            return workflowsFunctions[rule[0]](copy(currentRanges));
          } else {
            const [check, dest] = rule;
            if (check.includes('<')) {
              const [elToCheck, rawCheckValue] = check.split('<');
              const checkValue = toInt(rawCheckValue);
              const [from, to] = currentRanges[elToCheck];
              const currentRangesCopy = copy(currentRanges);

              if (from >= checkValue) {
                continue;
              }
              if (to >= checkValue) {
                currentRangesCopy[elToCheck][1] = checkValue - 1;

                currentRanges[elToCheck][0] = checkValue;
              }

              workflowsFunctions[dest](copy(currentRangesCopy));
            }
            if (check.includes('>')) {
              const [elToCheck, rawCheckValue] = check.split('>');
              const checkValue = toInt(rawCheckValue);
              const [from, to] = currentRanges[elToCheck];
              const currentRangesCopy = copy(currentRanges);

              if (to <= checkValue) {
                continue;
              }
              if (from <= checkValue) {
                currentRangesCopy[elToCheck][0] = checkValue + 1;

                currentRanges[elToCheck][1] = checkValue;
              }

              workflowsFunctions[dest](copy(currentRangesCopy));
            }
          }
        }
      };
    });

    workflowsFunctions['in'](initRanges);

    return accepted;
  },
  map(Object.values),
  map(map(([from, to]) => to - from + 1)),
  map(multiply),
  sum
);

console.log('Took', performance.now() - before);

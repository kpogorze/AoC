import { desc, log, map, pipe, sort, split, splitByLine, toInt } from 'utils';

const takeLast = (arr) => arr[arr.length - 1];

const first = pipe(
  split('\n\n'),
  map(splitByLine),
  map(map(split(':'))),
  map((arr, i) => {
    let items = arr[1][1].split(',').map((s) => toInt(s.trim()));
    let expression = arr[2][1].split(' = ')[1].split(' ');

    let operation = (n) =>
      expression[1] === '+'
        ? getFirst(n) + getSecond(n)
        : getFirst(n) * getSecond(n);
    let getFirst = (n) =>
      isNaN(toInt(expression[0])) ? n : toInt(expression[0]);
    let getSecond = (n) =>
      isNaN(toInt(expression[2])) ? n : toInt(expression[2]);

    let mod = toInt(takeLast(arr[3][1].split(' ')));
    let yes = toInt(takeLast(arr[4][1].split(' ')));
    let no = toInt(takeLast(arr[5][1].split(' ')));

    let test = (n) => (n % mod === 0 ? yes : no);

    return {
      items,
      operation,
      test,
      mod,
      yes,
      no,
      times: 0,
    };
  }),
  log,
  (monkeys) => {
    for (let i = 0; i < 20; i++) {
      monkeys.forEach((monkey) => {
        monkey.items.forEach((item) => {
          let newItem = Math.floor(monkey.operation(item) / 3);
          monkeys[monkey.test(newItem)].items.push(newItem);
          monkey.times++;
        });

        monkey.items = [];
      });

      console.log(
        i + 1,
        monkeys.map((m) => m.times)
      );
    }

    return monkeys;
  },
  map((m) => m.times),
  log,
  sort(desc),
  (a) => a[0] * a[1],
  log
);

const second = pipe(
  split('\n\n'),
  map(splitByLine),
  map(map(split(':'))),
  map((arr, i) => {
    let items = arr[1][1].split(',').map((s) => ({
      value: toInt(s.trim()),
    }));
    let expression = arr[2][1].split(' = ')[1].split(' ');

    let operation = (n) =>
      expression[1] === '+'
        ? getFirst(n) + getSecond(n)
        : getFirst(n) * getSecond(n);
    let getFirst = (n) =>
      isNaN(toInt(expression[0])) ? n : toInt(expression[0]);
    let getSecond = (n) =>
      isNaN(toInt(expression[2])) ? n : toInt(expression[2]);

    let mod = toInt(takeLast(arr[3][1].split(' ')));
    let yes = toInt(takeLast(arr[4][1].split(' ')));
    let no = toInt(takeLast(arr[5][1].split(' ')));

    let test = (n) => (n % mod === 0 ? yes : no);

    return {
      items,
      operation,
      test,
      mod,
      yes,
      no,
      times: 0,
    };
  }),
  (monkeys) => {
    const modChecks = monkeys.map((m) => m.mod);
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        modChecks.forEach((mod) => {
          item[mod] = item.value % mod;
        });
      });
    });

    for (let i = 0; i < 10000; i++) {
      monkeys.forEach((monkey) => {
        monkey.items.forEach((item) => {
          modChecks.forEach((mod) => {
            item[mod] = monkey.operation(item[mod]) % mod;
          });
          let newMonkeyId = monkey.test(item[monkey.mod]);
          monkeys[newMonkeyId].items.push(item);
          monkey.times++;
        });

        monkey.items = [];
      });

      console.log(
        i + 1,
        monkeys.map((m) => m.times)
      );
    }

    return monkeys;
  },
  map((m) => m.times),
  sort(desc),
  (a) => a[0] * a[1],
  log
);

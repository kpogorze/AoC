import { pipe, split, map, toInt, log, sum, range } from "../../../utils.js";

const first = pipe(
  split('\n'),
  map(toInt),
  numbers => {
    let res = numbers.map((value, order) => ({ value, order }));

    numbers.forEach((val, ord) => {
      const currentIndex = res.findIndex(({ order }) => ord === order);
      const currentNumber = res[currentIndex]
      const newIndex = (currentIndex + currentNumber.value) % (numbers.length - 1)

      if (newIndex === currentIndex) return;

      const splitPoint = newIndex
      const notCurrentNumber = ({ order }) => order !== currentNumber.order;
      const movingSpace = res.filter(notCurrentNumber)

      res = [...movingSpace.slice(0, splitPoint), currentNumber, ...movingSpace.slice(splitPoint)]
    });

    return res.map(({ value }) => value);
  },
  arr => {
    const zeroIndex = arr.findIndex(i => i === 0);
    return [1000, 2000, 3000].map(index => arr[(zeroIndex + index) % arr.length])
  },
  sum,
);


const second = pipe(
  split('\n'),
  map(toInt),
  numbers => {
    let res = numbers.map((value, order) => ({ value: value * 811589153, order }));

    range(1, 10).forEach(() => {
      numbers.forEach((val, ord) => {
        const currentIndex = res.findIndex(({ order }) => ord === order);
        const currentNumber = res[currentIndex]
        const newIndex = (currentIndex + currentNumber.value) % (numbers.length - 1)

        if (newIndex === currentIndex) return;

        const splitPoint = newIndex
        const notCurrentNumber = ({ order }) => order !== currentNumber.order;
        const movingSpace = res.filter(notCurrentNumber)

        res = [...movingSpace.slice(0, splitPoint), currentNumber, ...movingSpace.slice(splitPoint)]
      });
    })

    return res.map(({ value }) => value);
  },
  arr => {
    const zeroIndex = arr.findIndex(i => i === 0);
    return [1000, 2000, 3000].map(index => arr[(zeroIndex + index) % arr.length])
  },
  sum,
);
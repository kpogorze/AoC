import {
  count,
  desc,
  map,
  pipe,
  sort,
  split,
  sum,
  toInt,
} from '../../../utils.js';

const cards = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
].toReversed();

const handStrength = (hand) => {
  const cardCount = count(
    hand.split('').map((card) => cards.findIndex((c) => c === card))
  );
  const values = Object.values(cardCount).sort(desc);
  switch (values[0]) {
    case 5:
      return 7;
    case 4:
      return 6;
    case 3:
      return values[1] === 2 ? 5 : 4;
    case 2:
      return values[1] === 2 ? 3 : 2;
    case 1:
      return 1;
    default:
      break;
  }
};

const first = pipe(
  split('\n'),
  map(split(' ')),
  map(([hand, bid]) => [hand, toInt(bid)]),
  sort(([handA], [handB]) => {
    if (handStrength(handA) === handStrength(handB)) {
      for (let i = 0; i < handA.length; i++) {
        const aOrder = cards.findIndex((c) => c === handA[i]);
        const bOrder = cards.findIndex((c) => c === handB[i]);
        if (aOrder === bOrder) continue;

        return aOrder - bOrder;
      }

      return 0;
    }

    return handStrength(handA) - handStrength(handB);
  }),
  map(([hand, bid], i) => bid * (i + 1)),
  sum
);

const cardsWithJoker = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'J',
].toReversed();

const handStrengthWithJokers = (hand) => {
  const cardCount = count(
    hand
      .split('')
      .filter((c) => c !== 'J')
      .map((card) => cardsWithJoker.findIndex((c) => c === card))
  );
  const values = Object.values(cardCount).sort(desc);
  const jokerCount = hand.split('').filter((c) => c === 'J').length;

  switch ((values[0] ?? 0) + jokerCount) {
    case 5:
      return 7;
    case 4:
      return 6;
    case 3:
      return values[1] === 2 ? 5 : 4;
    case 2:
      return values[1] === 2 ? 3 : 2;
    case 1:
      return 1;
    default:
      break;
  }
};

const second = pipe(
  split('\n'),
  map(split(' ')),
  map(([hand, bid]) => [hand, toInt(bid)]),
  sort(([handA], [handB]) => {
    if (handStrengthWithJokers(handA) === handStrengthWithJokers(handB)) {
      for (let i = 0; i < handA.length; i++) {
        const aOrder = cardsWithJoker.findIndex((c) => c === handA[i]);
        const bOrder = cardsWithJoker.findIndex((c) => c === handB[i]);
        if (aOrder === bOrder) continue;

        return aOrder - bOrder;
      }

      return 0;
    }

    return handStrengthWithJokers(handA) - handStrengthWithJokers(handB);
  }),
  map(([hand, bid], i) => bid * (i + 1)),
  sum
);

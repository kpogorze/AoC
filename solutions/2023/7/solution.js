import {
  count,
  desc,
  divideWether,
  end,
  eq,
  exec,
  K,
  map,
  match,
  orElse,
  pick,
  pipe,
  sort,
  split,
  start,
  sum,
  toInt,
} from 'utils';

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

const handType = match([
  [pipe(pick(0), eq(5)), K(7)],
  [pipe(pick(0), eq(4)), K(6)],
  [pipe(pick(0), eq(3)), pipe(pick(1), match([[eq(2), K(5)]]), orElse(4))],
  [pipe(pick(0), eq(2)), pipe(pick(1), match([[eq(2), K(3)]]), orElse(2))],
  [pipe(pick(0), eq(1)), K(1)],
]);

const handStrength = pipe(
  split(''),
  count,
  Object.values,
  sort(desc),
  handType
);

const handStrengthWithJokers = pipe(
  split(''),
  count,
  Object.entries,
  divideWether(pipe(start, eq('J'))),
  map(map(end)),
  ([jokers, rest]) =>
    rest.length
      ? exec(
          rest,
          sort(desc),
          map((v, i) => (i === 0 ? v + (jokers[0] ?? 0) : v))
        )
      : jokers,
  handType
);

const comparator =
  (handStrengthFunc, cardList) =>
  ([handA], [handB]) => {
    if (handStrengthFunc(handA) === handStrengthFunc(handB)) {
      for (let i = 0; i < handA.length; i++) {
        const aOrder = cardList.findIndex((c) => c === handA[i]);
        const bOrder = cardList.findIndex((c) => c === handB[i]);
        if (aOrder === bOrder) continue;

        return aOrder - bOrder;
      }

      return 0;
    }

    return handStrengthFunc(handA) - handStrengthFunc(handB);
  };

const parseInput = pipe(
  split('\n'),
  map(split(' ')),
  map(([hand, bid]) => [hand, toInt(bid)])
);

export const first = pipe(
  parseInput,
  sort(comparator(handStrength, cards)),
  map(([hand, bid], i) => bid * (i + 1)),
  sum
);

export const second = pipe(
  parseInput,
  sort(comparator(handStrengthWithJokers, cardsWithJoker)),
  map(([hand, bid], i) => bid * (i + 1)),
  sum
);

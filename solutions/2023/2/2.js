import { filter, map, pick, pipe, split, sum, toInts } from "../../../utils.js";

const first = pipe(
  split("\n"),
  map(split(":")),
  map(([game, cubes]) => [
    toInts(game).at(0),
    cubes
      .trim()
      .split(";")
      .map((s) => s.trim().split(",")),
  ]),
  map(([game, sets]) => [
    game,
    sets.reduce(
      (acc, curr) => {
        curr.forEach((pull) => {
          if (pull.includes("red")) {
            acc.red = Math.max(acc.red, toInts(pull).at(0));
          }
          if (pull.includes("blue")) {
            acc.blue = Math.max(acc.blue, toInts(pull).at(0));
          }
          if (pull.includes("green")) {
            acc.green = Math.max(acc.green, toInts(pull).at(0));
          }
        });
        return acc;
      },
      {
        red: 0,
        blue: 0,
        green: 0,
      }
    ),
  ]),
  filter(
    ([game, maxPulls]) =>
      maxPulls.red <= 12 && maxPulls.green <= 13 && maxPulls.blue <= 14
  ),
  map(pick(0)),
  sum
);

const second = pipe(
  split("\n"),
  map(split(":")),
  map(([game, cubes]) => [
    toInts(game).at(0),
    cubes
      .trim()
      .split(";")
      .map((s) => s.trim().split(",")),
  ]),
  map(([game, sets]) => [
    game,
    sets.reduce(
      (acc, curr) => {
        curr.forEach((pull) => {
          if (pull.includes("red")) {
            acc.red = Math.max(acc.red, toInts(pull).at(0));
          }
          if (pull.includes("blue")) {
            acc.blue = Math.max(acc.blue, toInts(pull).at(0));
          }
          if (pull.includes("green")) {
            acc.green = Math.max(acc.green, toInts(pull).at(0));
          }
        });

        return acc;
      },
      {
        red: 0,
        blue: 0,
        green: 0,
      }
    ),
  ]),
  map(([game, maxPulls]) => maxPulls.red * maxPulls.blue * maxPulls.green),
  sum
);

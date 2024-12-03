import { map, multiply, pipe, sequence, split, sum, take, toInts } from 'utils';

const parseInput = pipe(split('\n'), map(toInts));

const findMaxGeodes =
  (timeLimit) =>
  ([
    id,
    oreRobotCost,
    clayRobotCost,
    obsidianRobotOreCost,
    obsidianRobotClayCost,
    geodeRobotOreCost,
    geodeRobotObsidianCost,
  ]) => {
    const toCheck = [[1, 0, 0, 0, 0, 0, 0, 0, 0]];
    let maxGeode = 0;
    const maxOreUtility = Math.max(
      oreRobotCost,
      clayRobotCost,
      obsidianRobotOreCost,
      geodeRobotOreCost
    );

    while (toCheck.length) {
      const [
        oreRobots,
        clayRobots,
        obsidianRobots,
        geodeRobots,
        ore,
        clay,
        obsidian,
        geode,
        time,
      ] = toCheck.pop();
      const timeLeft = timeLimit - time;

      if (timeLeft <= 0) continue;
      if (
        geode + geodeRobots * timeLeft + sum(sequence(1, timeLeft)) <=
        maxGeode
      )
        continue;

      if (oreRobots < maxOreUtility) {
        const timeToProduce = Math.ceil(
          Math.max(0, oreRobotCost - ore) / oreRobots
        );
        const timeIncrement = timeToProduce + 1;

        toCheck.push([
          oreRobots + 1,
          clayRobots,
          obsidianRobots,
          geodeRobots,
          ore - oreRobotCost + oreRobots * timeIncrement,
          clay + clayRobots * timeIncrement,
          obsidian + obsidianRobots * timeIncrement,
          geode + geodeRobots * timeIncrement,
          time + timeIncrement,
        ]);
      }

      if (clayRobots < obsidianRobotClayCost) {
        const timeToProduce = Math.ceil(
          Math.max(0, clayRobotCost - ore) / oreRobots
        );
        const timeIncrement = timeToProduce + 1;

        toCheck.push([
          oreRobots,
          clayRobots + 1,
          obsidianRobots,
          geodeRobots,
          ore - clayRobotCost + oreRobots * timeIncrement,
          clay + clayRobots * timeIncrement,
          obsidian + obsidianRobots * timeIncrement,
          geode + geodeRobots * timeIncrement,
          time + timeIncrement,
        ]);
      }

      if (clayRobots && obsidianRobots < geodeRobotObsidianCost) {
        const timeToProduceOre = Math.ceil(
          Math.max(0, obsidianRobotOreCost - ore) / oreRobots
        );
        const timeToProduceClay = Math.ceil(
          Math.max(0, obsidianRobotClayCost - clay) / clayRobots
        );
        const timeIncrement = Math.max(timeToProduceOre, timeToProduceClay) + 1;

        toCheck.push([
          oreRobots,
          clayRobots,
          obsidianRobots + 1,
          geodeRobots,
          ore - obsidianRobotOreCost + oreRobots * timeIncrement,
          clay - obsidianRobotClayCost + clayRobots * timeIncrement,
          obsidian + obsidianRobots * timeIncrement,
          geode + geodeRobots * timeIncrement,
          time + timeIncrement,
        ]);
      }

      if (obsidianRobots) {
        const timeToProduceOre = Math.ceil(
          Math.max(0, geodeRobotOreCost - ore) / oreRobots
        );
        const timeToProduceObsidian = Math.ceil(
          Math.max(0, geodeRobotObsidianCost - obsidian) / obsidianRobots
        );
        const timeIncrement =
          Math.max(timeToProduceOre, timeToProduceObsidian) + 1;

        toCheck.push([
          oreRobots,
          clayRobots,
          obsidianRobots,
          geodeRobots + 1,
          ore - geodeRobotOreCost + oreRobots * timeIncrement,
          clay + clayRobots * timeIncrement,
          obsidian - geodeRobotObsidianCost + obsidianRobots * timeIncrement,
          geode + geodeRobots * timeIncrement,
          time + timeIncrement,
        ]);
      }

      if (geodeRobots) {
        const geodesAtTimeLimit = geode + geodeRobots * timeLeft;
        if (geodesAtTimeLimit > maxGeode) {
          maxGeode = geodesAtTimeLimit;
        }
      }
    }

    return maxGeode;
  };

export const first = pipe(
  parseInput,
  map((data) => data[0] * findMaxGeodes(24)(data)),
  sum
);

export const second = pipe(
  parseInput,
  take(3),
  map(findMaxGeodes(32)),
  multiply
);

import { asc, copy, count, desc, log, map, pairwise, pipe, range, reduce, sort, split, splitByLine, sum, take, toInt, toInts } from "../../../utils.js";

const parseInput = pipe(
  split('\n'),
  map(toInts),
)

pipe(
  parseInput,
  take(1),
  map(([id, oreCost, clayCost, obsidianOreCost, obsidianClayCost, geodeOreCost, geodeObsidianCost]) => {
    const solvePosition = (robotOrder, timeLimit) => {
      const oreRobots = [0],
        clayRobots = [],
        obsidianRobots = [],
        geodeRobots = [];

      const resourcesCollected = (robots, time) => robots.filter(t => t<time).length * time - sum(robots.filter(t => t<time))
      const manufactureCost = (robots, cost, time) => robots.filter(t => t<=time).length * cost
      
      const oreAmount = (time) => (
        resourcesCollected(oreRobots, time) 
        - manufactureCost(oreRobots, oreCost, time) + oreCost 
        - manufactureCost(clayRobots, clayCost, time) 
        - manufactureCost(obsidianRobots, obsidianOreCost, time) 
        - manufactureCost(geodeRobots, geodeOreCost, time)
      )
      const clayAmount = (time) => resourcesCollected(clayRobots, time) - manufactureCost(obsidianRobots, obsidianClayCost, time)
      const obsidianAmount = (time) => resourcesCollected(obsidianRobots, time) - manufactureCost(geodeRobots, geodeObsidianCost, time)
      const geodeAmount = (time) => resourcesCollected(geodeRobots, time)

      let robotToMake = robotOrder.shift();

      for (const t of range(1,timeLimit-1)) {
        if(robotToMake === 'g' && oreAmount(t)>=geodeOreCost && obsidianAmount(t)>=geodeObsidianCost) {
          geodeRobots.push(t+1)
          robotToMake = robotOrder.shift();
        }
        else if(robotToMake === 'o' && oreAmount(t)>=obsidianOreCost && clayAmount(t)>=obsidianClayCost) {
          obsidianRobots.push(t+1)
          robotToMake = robotOrder.shift();
        }
        else if(robotToMake === 'c' && oreAmount(t)>=clayCost) {
          clayRobots.push(t+1)
          robotToMake = robotOrder.shift();
        }
        else if(robotToMake === 'r' && oreAmount(t)>=oreCost) {
          oreRobots.push(t+1)
          robotToMake = robotOrder.shift();
        }
      }

      if(robotOrder.length) throw 'bruh'

      console.log(oreAmount(timeLimit), clayAmount(timeLimit),obsidianAmount(timeLimit), geodeAmount(timeLimit) )

      return [oreRobots, clayRobots, obsidianRobots, geodeRobots];
    }

    

    return solvePosition('cccocogg'.split(''), 24)
  }),
  log
)(input);

import { pipe } from 'utils';
import { exec, log } from 'utils';

const params = new URLSearchParams(window.location.search);

const year = params.get('year');
const day = params.get('day');
const solutionPrefix = year && day ? `./solutions/${year}/${day}/` : './';

document.querySelector('iframe').addEventListener(
  'load',
  async () => {
    const input = await fetch(`${solutionPrefix}input.txt`).then((response) =>
      response.text()
    );
    const solutionModule = await import(`${solutionPrefix}solution.js`);

    const parseInput = solutionModule.parseInput ?? pipe();

    const first = solutionModule.first ?? pipe();

    const second = solutionModule.second ?? pipe();

    setTimeout(() => {
      const before = performance.now();

      exec(input, parseInput, first, log);

      console.log('Part 1 took', performance.now() - before);
    });

    setTimeout(() => {
      const before = performance.now();

      exec(input, parseInput, second, log);

      console.log('Part 2 took', performance.now() - before);
    });
  },
  { once: true }
);

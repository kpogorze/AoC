import { exec, log } from 'utils';

const params = new URLSearchParams(window.location.search);

const year = params.get('year');
const day = params.get('day');
const solutionPrefix = year && day ? `./solutions/${year}/${day}/` : './';

document.querySelector('iframe').addEventListener(
  'load',
  async () => {
    const input = await fetch(`${solutionPrefix}input.txt`).then((response) =>
      response.status === 200
        ? response.text()
        : fetch(`./input.txt`).then((res) => res.text())
    );
    const { first, second } = await import(
      `${solutionPrefix}solution.js`
    ).catch((err) => {
      console.error(err);
      return import('./solution.js');
    });

    setTimeout(() => {
      const before = performance.now();

      exec(input, first, log);

      console.log('Part 1 took', performance.now() - before);
    });

    setTimeout(() => {
      const before = performance.now();

      exec(input, second, log);

      console.log('Part 2 took', performance.now() - before);
    });
  },
  { once: true }
);

import { input } from './input.js';
import {
  asc,
  log,
  map,
  pick,
  pipe,
  sort,
  split,
  splitByLine,
  sum,
} from 'utils';

const dirSizes = pipe(
  splitByLine,
  map(split(' ')),
  (arr) => {
    const root = {
      name: '/',
      size: 0,
      children: [],
    };
    let path = [root];
    let currentDir = root;
    for (let i = 0; i < arr.length; i++) {
      let line = arr[i];
      if (line[0] === '$') {
        if (line[1] === 'cd') {
          if (line[2] === '/') {
            currentDir = root;
            path = [root];
          } else if (line[2] === '..') {
            path.pop();
            currentDir = path[path.length - 1];
          } else {
            currentDir = currentDir.children.find(
              (dir) => dir.name === line[2]
            );
            path.push(currentDir);
          }
        }
        if (line[1] === 'ls') {
          while (arr[i + 1] && arr[i + 1][0] !== '$') {
            i++;
            line = arr[i];
            if (line[0] === 'dir') {
              const file = {
                name: line[1],
                size: 0,
                children: [],
              };
              currentDir.children.push(file);
            } else {
              const file = {
                name: line[1],
                size: +line[0],
                children: [],
              };
              currentDir.children.push(file);
            }
          }
        }
      }
    }

    return root;
  },
  (root) => {
    const sizes = [];
    const getSize = (file) => {
      const size = +file.size + pipe(map(getSize), sum)(file.children);
      if (file.children.length) {
        sizes.push(size);
      }
      return size;
    };

    getSize(root);

    return sizes;
  }
)(input);

const total = pipe(
  splitByLine,
  map(split(' ')),
  (arr) => arr.filter((line) => Number.isInteger(+line[0])),
  map((line) => +line[0]),
  sum,
  log
)(input);

export const first = pipe(
  (arr) => arr.filter((i) => i <= 100000),
  sum
)(dirSizes);

export const second = pipe(
  (arr) => arr.filter((i) => i >= 30000000 - (70000000 - total)),
  sort(asc),
  pick(0)
)(dirSizes);

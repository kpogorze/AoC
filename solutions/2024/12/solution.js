import {
  end,
  eq,
  exec,
  flatMap,
  flatten,
  getAllNeighbors,
  getStrictNeighbors,
  map,
  parseGrid,
  pipe,
  spreadGrid,
  start,
  sum,
  unique,
} from 'utils';

const parseInput = pipe(parseGrid, spreadGrid);

export const first = pipe(parseInput, (points) =>
  exec(
    points,
    map(end),
    unique,
    map((el) => points.filter(([_, v]) => eq(v, el))),
    map((plantPoints) => {
      const plants = plantPoints.map(start);
      let toCheck = [...plants];
      const res = [];

      while (toCheck.length) {
        const currentToCheck = [toCheck.shift()];
        let current = [];

        while (currentToCheck.length) {
          const currentlyChecked = currentToCheck.shift();
          current.push(currentlyChecked);

          getStrictNeighbors(currentlyChecked)
            .filter((el) => plants.some((a) => eq(a, el)))
            .filter((el) => current.every((a) => !eq(a, el)))
            .filter((el) => currentToCheck.every((a) => !eq(a, el)))
            .forEach((el) => currentToCheck.push(el));
        }
        res.push(current);

        toCheck = toCheck.filter((el) => current.every((a) => !eq(el, a)));
      }

      return res;
    }),
    flatMap(
      flatMap(
        map(
          (el, i, arr) =>
            getStrictNeighbors(el).filter((el) => arr.every((a) => !eq(el, a)))
              .length * arr.length
        )
      )
    ),
    sum
  )
);

export const second = pipe(parseInput, (grid) =>
  exec(
    grid,
    map(flatMap((el) => [el, el])),
    flatMap((el) => [el, el]),
    spreadGrid,
    (points) =>
      exec(
        points,
        map(end),
        unique,
        map((el) => points.filter(([_, v]) => eq(v, el))),
        map((plantPoints) => {
          const plants = plantPoints.map(start);
          let toCheck = [...plants];
          const res = [];

          while (toCheck.length) {
            const currentToCheck = [toCheck.shift()];
            let current = [];

            while (currentToCheck.length) {
              const currentlyChecked = currentToCheck.shift();
              current.push(currentlyChecked);

              getStrictNeighbors(currentlyChecked)
                .filter((el) => plants.some((a) => eq(a, el)))
                .filter((el) => current.every((a) => !eq(a, el)))
                .filter((el) => currentToCheck.every((a) => !eq(a, el)))
                .forEach((el) => currentToCheck.push(el));
            }
            res.push(current);

            toCheck = toCheck.filter((el) => current.every((a) => !eq(el, a)));
          }

          return res;
        }),
        map(
          map((region) => {
            const corners = region.filter((point) => {
              const neighbors = getAllNeighbors(point);
              const same = neighbors.filter((el) => region.some(eq(el)));
              return (
                same.length === 3 || same.length === 7 || same.length === 4
              );
            }).length;

            return corners * (region.length / 4);
          })
        ),
        flatten,
        sum
      )
  )
);

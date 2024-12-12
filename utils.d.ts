/*---------------------------------- FUNCTIONS ----------------------------------*/

type Unary<const Arg, const Ret> = (arg: Arg) => Ret;

export function I<const T>(arg: T): T;

export function K<const T>(val: T): () => T;

export function pipe<const T>(): Unary<T, T>;
export function pipe<const T, const F1>(f1: Unary<T, F1>): Unary<T, F1>;
export function pipe<const T, const F1, const F2>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>
): Unary<T, F2>;
export function pipe<const T, const F1, const F2, const F3>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>
): Unary<T, F3>;
export function pipe<const T, const F1, const F2, const F3, const F4>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>
): Unary<T, F4>;
export function pipe<const T, const F1, const F2, const F3, const F4, const F5>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>
): Unary<T, F5>;
export function pipe<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6
>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>
): Unary<T, F6>;
export function pipe<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7
>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>
): Unary<T, F7>;
export function pipe<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7,
  const F8
>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>,
  f8: Unary<F7, F8>
): Unary<T, F8>;
export function pipe<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7,
  const F8,
  const F9
>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>,
  f8: Unary<F7, F8>,
  f9: Unary<F8, F9>
): Unary<T, F9>;
export function pipe<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7,
  const F8,
  const F9,
  const F10
>(
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>,
  f8: Unary<F7, F8>,
  f9: Unary<F8, F9>,
  f10: Unary<F9, F10>
): Unary<T, F10>;

export function exec<const T>(arg: T): T;
export function exec<const T, const F1>(arg: T, f1: Unary<T, F1>): F1;
export function exec<const T, const F1, const F2>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>
): F2;
export function exec<const T, const F1, const F2, const F3>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>
): F3;
export function exec<const T, const F1, const F2, const F3, const F4>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>
): F4;
export function exec<const T, const F1, const F2, const F3, const F4, const F5>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>
): F5;
export function exec<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6
>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>
): F6;
export function exec<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7
>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>
): F7;
export function exec<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7,
  const F8
>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>,
  f8: Unary<F7, F8>
): F8;
export function exec<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7,
  const F8,
  const F9
>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>,
  f8: Unary<F7, F8>,
  f9: Unary<F8, F9>
): F9;
export function exec<
  const T,
  const F1,
  const F2,
  const F3,
  const F4,
  const F5,
  const F6,
  const F7,
  const F8,
  const F9,
  const F10
>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>,
  f8: Unary<F7, F8>,
  f9: Unary<F8, F9>,
  f10: Unary<F9, F10>
): F10;

export function apply<const F extends (...args: readonly any[]) => any>(
  func: F
): (args: Readonly<Parameters<F>>) => ReturnType<F>;

export function call(
  ...args: readonly any[]
): <F extends (...args: readonly any[]) => any>(func: F) => ReturnType<F>;

export function invoke<const T, Key extends keyof T>(
  methodName: Key,
  ...args: readonly Parameters<T[Key]>
): (obj: T) => ReturnType<T[Key]>;

export function negate<F extends (...args: readonly any[]) => boolean>(
  func: F
): F;

export function mapFn<const T, const Fns extends Unary<T, any>[]>(
  funcList: Fns
): (arg: T) => { [K in keyof Fns]: ReturnType<Fns[K]> };

export function flip<const T, const U, const V>(
  f: (a: T) => (b: U) => V,
  b: U
): (a: T) => V;
export function flip<const T, const U, const V>(
  f: (a: T) => (b: U) => V
): (b: U) => (a: T) => V;

export const memoize: typeof I;

/*---------------------------------- OBJECT ----------------------------------*/

export function pluck<const T, Prop extends keyof T>(
  prop: Prop
): (obj: T) => T[Prop];

export const log: typeof I;

export const copy: typeof I;

export function mapObject<
  const TK extends string,
  const T,
  const UK extends string,
  const U
>(
  mapfn: (arg: [TK, T]) => readonly [UK, U]
): (obj: Record<TK, T>) => Record<UK, U>;

export function eq<const T>(a: T, b: T): boolean;
export function eq<const T>(a: T): (b: T) => boolean;

export function construct<T extends new (...args: any) => any>(
  cons: T
): (...args: ConstructorParameters<T>) => InstanceType<T>;

/*---------------------------------- COLLECTIONS ----------------------------------*/

export function toArray<const T>(
  arg: Iterable<T> | ArrayLike<T>
): ReadonlyArray<T>;

export function join<const T>(char: string): (arr: readonly T[]) => string;

export function split(char: string): (str: string) => readonly string[];

export function splitByLine(str: string): readonly string[];

export function splitEvery(
  n: number
): <const T extends readonly any[]>(arr: T) => readonly T[];

export function sort<T>(
  compFunc: (a: T, b: T) => number
): (arr: ReadonlyArray<T>) => ReadonlyArray<T>;

export const asc: (a: number, b: number) => number;

export const desc: (a: number, b: number) => number;

export function map<const T, const U>(
  func: (el: T, index: number, arr: ReadonlyArray<T>) => U
): (arr: ReadonlyArray<T>) => ReadonlyArray<U>;

export function find<const T>(
  func: (el: T, index: number, arr: ReadonlyArray<T>) => boolean
): (arr: ReadonlyArray<T>) => T | undefined;

export function flatten<const T>(arr: readonly T[][]): readonly T[];

export function flatMap<const T, const U>(
  func: (el: T, index: number, arr: ReadonlyArray<T>) => ReadonlyArray<U>
): (arr: ReadonlyArray<T>) => ReadonlyArray<U>;

export function filter<const T>(
  func: (el: T, index: number, arr: ReadonlyArray<T>) => boolean
): (arr: ReadonlyArray<T>) => ReadonlyArray<T>;

export function reduce<T, const Acc>(
  init: Acc,
  reducer: (acc: Acc, curr: T, index: number) => Acc
): (arr: ReadonlyArray<T>) => Acc;

export function scan<T>(
  reducer: (acc: T, curr: T, index: number) => T
): (arr: ReadonlyArray<T>) => T;

export function take<T>(
  index: number
): (arr: ReadonlyArray<T>) => ReadonlyArray<T>;

export function pick<T>(index: number): (arr: ReadonlyArray<T>) => T;

export function start<const T extends any[]>(arr: T): T[0];

type LastElementOf<const T> = T extends [...any[], infer U] ? U : never;

export function end<const T>(arr: T): LastElementOf<T>;

export function count<T extends string | number>(
  arr: ReadonlyArray<T>
): Record<T, number>;

export function pairwise<T>(
  arr: ReadonlyArray<T>
): ReadonlyArray<ReadonlyArray<T>>;

export function rotate<T>(
  amount: number
): (arr: ReadonlyArray<T>) => ReadonlyArray<T>;

export function reverse<T>(arr: ReadonlyArray<T>): ReadonlyArray<T>;

export function divideWether<T>(
  func: (el: T, index: number, arr: ReadonlyArray<T>) => boolean
): (arr: ReadonlyArray<T>) => [ReadonlyArray<T>, ReadonlyArray<T>];

export function zip<T, U>(
  a: ReadonlyArray<T>,
  b: ReadonlyArray<U>
): ReadonlyArray<readonly [T, U]>;
export function zip<T, U>(
  a: ReadonlyArray<T>
): (b: ReadonlyArray<U>) => ReadonlyArray<readonly [T, U]>;

export function hash<const T>(...arg: readonly T[]): string;

export function unique<const T>(arr: readonly T[]): readonly T[];

/*---------------------------------- MATH ----------------------------------*/

export function add(a: number, b: number): number;

export function mul(a: number, b: number): number;

export function sub(a: number, b: number): number;

export function div(a: number, b: number): number;

export function sum(arr: readonly number[]): number;

export function multiply(arr: readonly number[]): number;

export function max(arr: readonly number[]): number;

export function min(arr: readonly number[]): number;

export function toInt(s: string): number;

export function toInts(s: string): readonly number[];

export function gcd(a: number, b: number): number;

export function lcm(a: number, b: number): number;

export function cartesian<T, U>(
  a: ReadonlyArray<T>,
  b: ReadonlyArray<U>
): ReadonlyArray<[T, U]>;

/*---------------------------------- LOGIC ----------------------------------*/

export function or(a: boolean, b: boolean): boolean;

export function and(a: boolean, b: boolean): boolean;

export function some<const T>(
  fn: Unary<T, boolean>
): (arr: readonly T[]) => boolean;

export function every<const T>(
  fn: Unary<T, boolean>
): (arr: readonly T[]) => boolean;

export function orElse<U>(
  def: U
): <T>(val: T) => T extends NonNullable<T> ? T : U;

export function match<T, U>(
  rules: readonly [Unary<T, boolean>, Unary<T, U>][]
): (val: T) => U | null;

/*---------------------------------- RANGES ----------------------------------*/

export function sequence(from: number, to: number): readonly number[];
export function sequence(from: number): (to: number) => readonly number[];

type SimpleRange = [number, number];

type RangeSet = readonly SimpleRange[];

export function range(from: number, to: number): RangeSet;

export function union(a: RangeSet, b: RangeSet): RangeSet;

export function intersection(a: RangeSet, b: RangeSet): RangeSet;

export function difference(a: RangeSet, b: RangeSet): RangeSet;

export function symmetricDifference(a: RangeSet, b: RangeSet): RangeSet;

export function enumerate(r: RangeSet): readonly number[];

export function shift(n: number): (r: RangeSet) => RangeSet;

/*---------------------------------- GRID ----------------------------------*/

type Grid<T> = readonly (readonly T[])[];

type Point2D = [number, number];

export function getPointValue<T>(grid: Grid<T>, pos: Point2D): T;
export function getPointValue<T>(grid: Grid<T>): (pos: Point2D) => T;

export function spreadGrid<T>(grid: Grid<T>): readonly [Point2D, T][];

export function translate<const T extends readonly number[]>(
  point: T,
  delta: T
): T;
export function translate<const T extends readonly number[]>(
  point: T
): (delta: T) => T;

export function transpose<T>(grid: Grid<T>): Grid<T>;

export function parseGrid(s: string): Grid<string>;

export const allNeighborDirs: readonly Point2D[];

export function getAllNeighbors(point: Point2D): readonly Point2D[];

export const strictNeighborDirs: readonly Point2D[];

export function getStrictNeighbors(point: Point2D): readonly Point2D[];

export function traverse<const T, U, const V>(
  initFn: Unary<T, U>,
  stopCondition: Unary<U, V | null>,
  transitionFn: Unary<U, U>
): (arg: T) => V;

/*---------------------------------- DS&A ----------------------------------*/

type PriorityQueue<T> = {
  add(val: [T, number]): void;
  get(): T;
  hasAny(): boolean;
  state: Record<number, readonly T[]>;
};

export function priorityQueue<T>(
  initElements: readonly [T, number][]
): PriorityQueue<T>;

export function bfs<const T, const U, const V>(
  space: T,
  starting: readonly U[],
  stopCondition: (current: U, space: T) => V | null,
  traversalFn: (current: U, space: T) => U[],
  canBacktrack?: boolean
): readonly V[];

export function dfs<const T, const U, const V>(
  space: T,
  starting: readonly U[],
  stopCondition: (current: U, space: T) => V | null,
  traversalFn: (current: U, space: T) => U[],
  canBacktrack?: boolean
): readonly V[];

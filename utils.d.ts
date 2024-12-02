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

export function exec<T>(arg: T): T;
export function exec<T, F1>(arg: T, f1: Unary<T, F1>): F1;
export function exec<T, F1, F2>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>
): F2;
export function exec<T, F1, F2, F3>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>
): F3;
export function exec<T, F1, F2, F3, F4>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>
): F4;
export function exec<T, F1, F2, F3, F4, F5>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>
): F5;
export function exec<T, F1, F2, F3, F4, F5, F6>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>
): F6;
export function exec<T, F1, F2, F3, F4, F5, F6, F7>(
  arg: T,
  f1: Unary<T, F1>,
  f2: Unary<F1, F2>,
  f3: Unary<F2, F3>,
  f4: Unary<F3, F4>,
  f5: Unary<F4, F5>,
  f6: Unary<F5, F6>,
  f7: Unary<F6, F7>
): F7;
export function exec<T, F1, F2, F3, F4, F5, F6, F7, F8>(
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
export function exec<T, F1, F2, F3, F4, F5, F6, F7, F8, F9>(
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

export function apply<F extends (...args: readonly any[]) => any>(
  func: F
): (args: Parameters<F>) => ReturnType<F>;

export function call(
  ...args: readonly any[]
): <F extends (...args: readonly any[]) => any>(func: F) => ReturnType<F>;

export function invoke<Key extends string>(
  methodName: Key,
  ...args: readonly any[]
): <Obj extends object>(obj: Obj) => ReturnType<Obj[Key]>;

export function negate<F extends (...args: readonly any[]) => boolean>(
  func: F
): F;

export function pluck<Prop extends string>(
  prop: Prop
): <Obj extends object>(obj: Obj) => Obj[Prop];

export const log: typeof I;

export const copy: typeof I;

export const mapObject;

export function eq<T>(a: T): (b: T) => boolean;

export function join(char: string): (arr: readonly any[]) => string;

export function split(char: string): (str: string) => readonly string[];

export function splitByLine(str: string): readonly string[];

export function splitEvery(
  n: number
): <T extends readonly any[]>(arr: T) => readonly T[];

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

export function reduce<T, Acc>(
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

export function start<T>(arr: ReadonlyArray<T>): T;

export function end<T>(arr: ReadonlyArray<T>): T;

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
): ReadonlyArray<[T, U]>;
export function zip<T, U>(
  a: ReadonlyArray<T>
): (b: ReadonlyArray<U>) => ReadonlyArray<[T, U]>;

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

export function orElse<U>(
  def: U
): <T>(val: T) => T extends NonNullable<T> ? T : U;

export function match<T, U>(
  rules: readonly [Unary<T, boolean>, Unary<T, U>][]
): (val: T) => U | null;

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

type Grid<T> = readonly (readonly T[])[];

type Point2D = [number, number];

export function getPointValue<T>(grid: Grid<T>): (pos: Point2D) => T;

export function spreadGrid<T>(grid: Grid<T>): readonly [Point2D, T][];

export function translate<const T extends readonly number[]>(
  point: T
): (delta: T) => T;

export function transpose<T>(grid: Grid<T>): Grid<T>;

export function parseGrid(s: string): Grid<string>;

export const allNeighborDirs: readonly Point2D[];

export function getAllNeighbors(point: Point2D): readonly Point2D[];

export const strictNeighborDirs: readonly Point2D[];

export function getStrictNeighbors(point: Point2D): readonly Point2D[];

type PriorityQueue<T> = {
  add(val: [T, number]): void;
  get(): T;
  hasAny(): boolean;
  state: Record<number, readonly T[]>;
};

export function priorityQueue<T>(
  initElements: readonly [T, number][]
): PriorityQueue<T>;
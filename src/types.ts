export interface IEnumerator<T> {
  current(): T;
  moveNext(): boolean;
  dispose(): void;
}

export interface IEnumerable<T> extends Iterable<T> {
  getEnumerator(): IEnumerator<T>;

  traverseBreadthFirst(childrenSelector: (element: T) => IEnumerable<T>): IEnumerable<T>;
  traverseBreadthFirst<TResult>(childrenSelector: (element: T) => IEnumerable<T>, resultSelector: (element: T, nestLevel: number) => TResult): IEnumerable<TResult>;
  traverseDepthFirst<TResult>(childrenSelector: (element: T) => IEnumerable<T>, resultSelector?: (element: T, nestLevel: number) => TResult): IEnumerable<TResult>;
  flatten(): IEnumerable<unknown>;
  pairwise<TResult>(selector: (prev: T, current: T) => TResult): IEnumerable<TResult>;
  scan(func: (prev: T, current: T) => T): IEnumerable<T>;
  scan<TAccumulate>(seed: TAccumulate, func: (prev: TAccumulate, current: T) => TAccumulate): IEnumerable<TAccumulate>;
  select<TResult>(selector: (element: T, index: number) => TResult): IEnumerable<TResult>;
  map<TResult>(selector: (element: T, index: number) => TResult): TResult[];
  selectMany<TOther>(collectionSelector: (element: T, index: number) => EnumerableInput<TOther>): IEnumerable<TOther>;
  selectMany<TCollection, TResult>(collectionSelector: (element: T, index: number) => EnumerableInput<TCollection>, resultSelector: (outer: T, inner: TCollection) => TResult): IEnumerable<TResult>;
  where<TOther extends T>(predicate: (element: T, index: number) => element is TOther): IEnumerable<TOther>;
  where(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
  whereIf(flag: boolean | string | undefined | null, filter: (element: T) => boolean): IEnumerable<T>;
  choose(selector: (element: T, index: number) => T): IEnumerable<T>;
  ofType<TResult>(type: unknown): IEnumerable<TResult>;
  zip<U, TResult>(second: EnumerableInput<U>, resultSelector: (first: T, second: U, index: number) => TResult): IEnumerable<TResult>;
  zip<TResult>(...params: unknown[]): IEnumerable<TResult>;
  merge(...params: EnumerableInput<T>[]): IEnumerable<T>;
  join<TInner, TKey, TResult>(inner: EnumerableInput<TInner>, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: TInner) => TResult, compareSelector?: (obj: TKey) => unknown): IEnumerable<TResult>;
  leftJoin<TInner, TKey, TResult>(inner: EnumerableInput<TInner>, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: TInner | null) => TResult, compareSelector?: (obj: TKey) => unknown): IEnumerable<TResult>;
  groupJoin<TInner, TKey, TResult>(inner: EnumerableInput<TInner>, outerKeySelector: (outer: T) => TKey, innerKeySelector: (inner: TInner) => TKey, resultSelector: (outer: T, inner: IEnumerable<TInner>) => TResult, compareSelector?: (obj: TKey) => unknown): IEnumerable<TResult>;
  all(predicate: (element: T) => boolean): boolean;
  any(predicate?: (element: T) => boolean): boolean;
  isEmpty(): boolean;
  concat(...sequences: EnumerableInput<T>[]): IEnumerable<T>;
  insert(index: number, second: EnumerableInput<T>): IEnumerable<T>;
  alternate(alternateValue: T | EnumerableInput<T>): IEnumerable<T>;
  contains<TCompare>(value: T, compareSelector?: (element: T) => TCompare): boolean;
  defaultIfEmpty(defaultValue?: T): IEnumerable<T>;
  distinct<TCompare>(compareSelector?: (element: T) => TCompare): IEnumerable<T>;
  distinctUntilChanged<TCompare>(compareSelector?: (element: T) => TCompare): IEnumerable<T>;
  except<TCompare>(second: EnumerableInput<T>, compareSelector?: (element: T) => TCompare): IEnumerable<T>;
  intersect<TCompare>(second: EnumerableInput<T>, compareSelector?: (element: T) => TCompare): IEnumerable<T>;
  union<TCompare>(second: EnumerableInput<T>, compareSelector?: (element: T) => TCompare): IEnumerable<T>;
  sequenceEqual<TCompare>(second: EnumerableInput<T>, compareSelector?: (element: T) => TCompare): boolean;
  orderBy<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): IOrderedEnumerable<T>;
  orderByDescending<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): IOrderedEnumerable<T>;
  reverse(): IEnumerable<T>;
  shuffle(): IEnumerable<T>;
  weightedSample(weightSelector: (element: T) => number): IEnumerable<T>;
  groupBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;
  groupBy<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement): IEnumerable<IGrouping<TKey, TElement>>;
  groupBy<TKey, TElement, TResult>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult): IEnumerable<TResult>;
  groupBy<TKey, TElement, TResult, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult, compareSelector: (key: TKey) => TCompare): IEnumerable<TResult>;
  partitionBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;
  partitionBy<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement): IEnumerable<IGrouping<TKey, TElement>>;
  partitionBy<TKey, TElement, TResult>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult): IEnumerable<TResult>;
  partitionBy<TKey, TElement, TResult, TCompare>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult, compareSelector: (key: TKey) => TCompare): IEnumerable<TResult>;
  buffer(count: number): IEnumerable<T[]>;
  aggregate(func: (prev: T, current: T) => T): T;
  aggregate<TAccumulate>(seed: TAccumulate, func: (prev: TAccumulate, current: T) => TAccumulate): TAccumulate;
  aggregate<TAccumulate, TResult>(seed: TAccumulate, func: (prev: TAccumulate, current: T) => TAccumulate, resultSelector: (last: TAccumulate) => TResult): TResult;
  average(selector?: (element: T) => number): number;
  count(predicate?: (element: T, index: number) => boolean): number;
  max(selector?: (element: T) => number): number;
  min(selector?: (element: T) => number): number;
  maxBy<TKey>(keySelector: (element: T) => TKey): T;
  minBy<TKey>(keySelector: (element: T) => TKey): T;
  sum(selector?: (element: T) => number): number;
  elementAt(index: number): T;
  elementAtOrDefault(index: number, defaultValue?: T): T | undefined;
  first<TOther extends T>(predicate: (element: T, index: number) => element is TOther): TOther;
  first(predicate?: (element: T, index: number) => boolean): T;
  firstOrDefault<TDefault>(predicate: (element: T, index: number) => boolean, defaultValue: TDefault): T | TDefault;
  firstOrDefault<TOther extends T, TDefault>(predicate: (element: T, index: number) => element is TOther, defaultValue: TDefault): TOther | TDefault;
  firstOrDefault(predicate?: (element: T, index: number) => boolean): T | undefined;
  firstOrDefault<TDefault>(defaultValue: TDefault): T | TDefault;
  last<TOther extends T>(predicate: (element: T, index: number) => element is TOther): TOther;
  last(predicate?: (element: T, index: number) => boolean): T;
  lastOrDefault<TDefault>(predicate: (element: T, index: number) => boolean, defaultValue: TDefault): T | TDefault;
  lastOrDefault<TOther extends T, TDefault>(predicate: (element: T, index: number) => element is TOther, defaultValue: TDefault): TOther | TDefault;
  lastOrDefault(predicate?: (element: T, index: number) => boolean): T | undefined;
  lastOrDefault<TDefault>(defaultValue: TDefault): T | TDefault;
  single<TOther extends T>(predicate: (element: T, index: number) => element is TOther): TOther;
  single(predicate?: (element: T, index: number) => boolean): T;
  singleOrDefault<TDefault>(predicate: (element: T, index: number) => boolean, defaultValue: TDefault): T | TDefault;
  singleOrDefault<TOther extends T, TDefault>(predicate: (element: T, index: number) => element is TOther, defaultValue: TDefault): TOther | TDefault;
  singleOrDefault(predicate?: (element: T, index: number) => boolean): T | undefined;
  singleOrDefault<TDefault>(defaultValue: TDefault): T | TDefault;
  skip(count: number): IEnumerable<T>;
  skipWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
  take(count: number): IEnumerable<T>;
  takeWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
  takeExceptLast(count?: number): IEnumerable<T>;
  takeFromLast(count: number): IEnumerable<T>;
  page(pageNumber: number, pageSize: number): IEnumerable<T>;
  page(info: IPageInfo): IEnumerable<T>;
  indexOf(item: T): number;
  indexOf(predicate: (element: T, index: number) => boolean): number;
  lastIndexOf(item: T): number;
  lastIndexOf(predicate: (element: T, index: number) => boolean): number;
  asEnumerable(): IEnumerable<T>;
  cast<TResult>(): IEnumerable<TResult>;
  toArray(): T[];
  toLookup<TKey>(keySelector: (element: T) => TKey): ILookup<TKey, T>;
  toLookup<TKey, TElement>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TElement, compareSelector?: (key: TKey) => unknown): ILookup<TKey, TElement>;
  toObject<TKey extends PropertyKey, TElement = T>(keySelector: (element: T) => TKey, elementSelector?: (element: T) => TElement): Record<TKey, TElement>;
  toDictionary<TKey>(keySelector: (element: T) => TKey): IDictionary<TKey, T>;
  toDictionary<TKey, TValue>(keySelector: (element: T) => TKey, elementSelector: (element: T) => TValue, compareSelector?: (key: TKey) => unknown): IDictionary<TKey, TValue>;
  toJSONString(replacer?: ((key: string, value: unknown) => unknown) | (string | number)[], space?: string | number): string;
  toJoinedString(separator?: string): string;
  toJoinedString<TResult>(separator: string, selector: (element: T, index: number) => TResult): string;
  joinWith(separator: string): string;
  joinWith(separator: (element: T) => T): IEnumerable<T>;
  toMap<K, V>(keySelector: (element: T) => K, valueSelector: (element: T) => V): Map<K, V>;
  chunk(size: number): IEnumerable<T[]>;
  index(): IEnumerable<IndexedItem<T>>;
  position(): IEnumerable<PositionedItem<T>>;
  withNeighbors(): IEnumerable<ItemWithNeighbors<T>>;
  doAction(action: (element: T, index: number) => void | boolean): IEnumerable<T>;
  forEach(action: (element: T, index: number) => void | boolean): void;
  force(): void;
  letBind<TResult>(func: (source: IEnumerable<T>) => EnumerableInput<TResult>): IEnumerable<TResult>;
  share(): IDisposableEnumerable<T>;
  memoize(): IDisposableEnumerable<T>;
  catchError(handler: ((exception: unknown) => void)): IEnumerable<T>;
  finallyAction(action: () => void): IEnumerable<T>;
  log<TValue>(selector?: (element: T) => TValue): IEnumerable<T>;
  trace<TValue>(message?: string, selector?: (element: T) => TValue): IEnumerable<T>;
}

export interface IOrderedEnumerable<T> extends IEnumerable<T> {
  createOrderedEnumerable<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>, descending?: boolean): IOrderedEnumerable<T>;
  thenBy<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): IOrderedEnumerable<T>;
  thenByDescending<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): IOrderedEnumerable<T>;
}

export interface IDisposableEnumerable<T> extends IEnumerable<T> {
  dispose(): void;
}

export interface IDictionary<TKey, TValue> {
  add(key: TKey, value: TValue): void;
  get(key: TKey): TValue;
  set(key: TKey, value: TValue): boolean;
  contains(key: TKey): boolean;
  clear(): void;
  remove(key: TKey): void;
  count(): number;
  toEnumerable(): IEnumerable<{ key: TKey; value: TValue }>;
}

export interface ILookup<TKey, TElement> {
  count(): number;
  get(key: TKey): IEnumerable<TElement>;
  contains(key: TKey): boolean;
  toEnumerable(): IEnumerable<IGrouping<TKey, TElement>>;
}

export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  key(): TKey;
  getSource(): TElement[];
}

export interface IPageInfo { pageNumber: number; pageSize: number }
export interface IndexedItem<T> { index: number; item: T }
export interface PositionedItem<T> extends IndexedItem<T> { isFirst: boolean; isLast: boolean }
export interface ItemWithNeighbors<T> { prev: T | null; item: T; next: T | null }

export type Comparer<T> = (first: T, second: T) => number;
export type EnumerableInput<T> = IEnumerable<T> | Iterable<T> | ArrayLike<T>;

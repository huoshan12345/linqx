/** Controls an imperative enumeration over a sequence. */
export interface IEnumerator<T> {
  /**
   * Gets the element at the enumerator's current position.
   *
   * @returns The current element. The value is valid only after `moveNext()` returns `true`.
   */
  current(): T;

  /**
   * Advances the enumerator to the next element.
   *
   * @returns `true` when a current element is available; otherwise, `false`.
   */
  moveNext(): boolean;

  /** Releases the underlying iterator and prevents further enumeration. */
  dispose(): void;
}

/** A composable, iterable sequence whose query operators are evaluated on demand unless noted. */
export interface IEnumerable<T> extends Iterable<T> {
  /**
   * Creates an imperative enumerator for this sequence.
   *
   * @returns A new enumerator positioned before the first element.
   */
  getEnumerator(): IEnumerator<T>;

  /**
   * Traverses a hierarchy level by level.
   *
   * @param childrenSelector Selects the children of each visited element.
   * @returns A deferred sequence containing each element in breadth-first order.
   */
  traverseBreadthFirst(
    childrenSelector: (element: T) => IEnumerable<T>,
  ): IEnumerable<T>;

  /**
   * Traverses a hierarchy level by level and projects each visited element.
   *
   * @param childrenSelector Selects the children of each visited element.
   * @param resultSelector Projects an element and its zero-based depth.
   * @returns A deferred sequence of projected values in breadth-first order.
   */
  traverseBreadthFirst<TResult>(
    childrenSelector: (element: T) => IEnumerable<T>,
    resultSelector: (element: T, nestLevel: number) => TResult,
  ): IEnumerable<TResult>;

  /**
   * Traverses a hierarchy by visiting each element before its descendants.
   *
   * @param childrenSelector Selects the children of each visited element.
   * @param resultSelector Optionally projects an element and its zero-based depth.
   * @returns A deferred sequence in depth-first, pre-order traversal order.
   */
  traverseDepthFirst<TResult>(
    childrenSelector: (element: T) => IEnumerable<T>,
    resultSelector?: (element: T, nestLevel: number) => TResult,
  ): IEnumerable<TResult>;

  /**
   * Recursively expands nested iterable values, while treating strings as scalar values.
   *
   * @returns A deferred, flattened sequence.
   */
  flatten(): IEnumerable<unknown>;

  /**
   * Projects every adjacent pair in the source sequence.
   *
   * @param selector Projects the previous and current elements.
   * @returns A deferred sequence containing one result for each adjacent pair.
   */
  pairwise<TResult>(selector: (prev: T, current: T) => TResult): IEnumerable<TResult>;

  /**
   * Produces each running accumulation, using the first element as the initial value.
   *
   * @param func Combines the previous accumulation with the current element.
   * @returns A deferred sequence whose first value is the first source element.
   */
  scan(func: (prev: T, current: T) => T): IEnumerable<T>;

  /**
   * Produces each running accumulation, beginning with the supplied seed.
   *
   * @param seed The initial accumulation, which is also the first value returned.
   * @param func Combines the previous accumulation with the current element.
   * @returns A deferred sequence containing the seed followed by each accumulated value.
   */
  scan<TAccumulate>(
    seed: TAccumulate,
    func: (prev: TAccumulate, current: T) => TAccumulate,
  ): IEnumerable<TAccumulate>;

  /**
   * Projects each source element and its zero-based index.
   *
   * @param selector Selects the result for each element.
   * @returns A deferred sequence of projected values.
   */
  select<TResult>(selector: (element: T, index: number) => TResult): IEnumerable<TResult>;

  /**
   * Eagerly projects all source elements into an array.
   *
   * @param selector Selects the result for each element and its zero-based index.
   * @returns An array containing the projected values.
   */
  map<TResult>(selector: (element: T, index: number) => TResult): TResult[];

  /**
   * Projects each source element to a sequence and flattens the resulting sequences.
   *
   * @param collectionSelector Selects an inner sequence for each element and index.
   * @returns A deferred sequence containing all inner elements.
   */
  selectMany<TOther>(
    collectionSelector: (element: T, index: number) => EnumerableInput<TOther>,
  ): IEnumerable<TOther>;

  /**
   * Projects each source element to a sequence, then combines outer and inner elements.
   *
   * @param collectionSelector Selects an inner sequence for each element and index.
   * @param resultSelector Projects each outer and inner element pair.
   * @returns A deferred sequence of combined results.
   */
  selectMany<TCollection, TResult>(
    collectionSelector: (element: T, index: number) => EnumerableInput<TCollection>,
    resultSelector: (outer: T, inner: TCollection) => TResult,
  ): IEnumerable<TResult>;

  /**
   * Filters the sequence with a type-guard predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns A deferred sequence narrowed to elements accepted by the predicate.
   */
  where<TOther extends T>(
    predicate: (element: T, index: number) => element is TOther,
  ): IEnumerable<TOther>;

  /**
   * Filters the sequence using a predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns A deferred sequence containing the accepted elements.
   */
  where(predicate: (element: T, index: number) => boolean): IEnumerable<T>;

  /**
   * Applies a filter only when a flag is truthy.
   *
   * @param flag A value that controls whether the filter is applied.
   * @param filter Tests each element when `flag` is truthy.
   * @returns The original sequence when the flag is falsy; otherwise, a filtered sequence.
   */
  whereIf(
    flag: boolean | string | undefined | null,
    filter: (element: T) => boolean,
  ): IEnumerable<T>;

  /**
   * Projects elements and omits projections that evaluate to `null` or `undefined`.
   *
   * @param selector Projects each element and its zero-based index.
   * @returns A deferred sequence of non-nullish projected values.
   */
  choose(selector: (element: T, index: number) => T): IEnumerable<T>;

  /**
   * Filters elements by a constructor or primitive wrapper (`Number`, `String`, or `Boolean`).
   *
   * @param type The constructor or primitive wrapper to match.
   * @returns A deferred sequence containing elements of the requested runtime type.
   */
  ofType<TResult>(type: unknown): IEnumerable<TResult>;

  /**
   * Combines two sequences element by element until either sequence ends.
   *
   * @param second The second sequence.
   * @param resultSelector Projects each pair and its zero-based index.
   * @returns A deferred sequence of projected pairs.
   */
  zip<U, TResult>(
    second: EnumerableInput<U>,
    resultSelector: (first: T, second: U, index: number) => TResult,
  ): IEnumerable<TResult>;

  /**
   * Combines multiple sequences element by element until any sequence ends.
   *
   * @param params Input sequences followed by a result-selector function. The selector also
   * receives the zero-based index as its final argument.
   * @returns A deferred sequence of projected tuples.
   * @throws {TypeError} When no sequence is supplied or the final argument is not a function.
   */
  zip<TResult>(...params: unknown[]): IEnumerable<TResult>;

  /**
   * Interleaves this sequence and the supplied sequences in round-robin order.
   *
   * @param params The sequences to merge.
   * @returns A deferred sequence that continues until every input is exhausted.
   */
  merge(...params: EnumerableInput<T>[]): IEnumerable<T>;

  /**
   * Correlates elements from two sequences that have equal comparison keys.
   *
   * @param inner The inner sequence.
   * @param outerKeySelector Selects a key from an outer element.
   * @param innerKeySelector Selects a key from an inner element.
   * @param resultSelector Projects each matching pair.
   * @param compareSelector Optionally normalizes keys before strict equality comparison.
   * @returns A deferred inner-join sequence.
   */
  join<TInner, TKey, TResult>(
    inner: EnumerableInput<TInner>,
    outerKeySelector: (outer: T) => TKey,
    innerKeySelector: (inner: TInner) => TKey,
    resultSelector: (outer: T, inner: TInner) => TResult,
    compareSelector?: (obj: TKey) => unknown,
  ): IEnumerable<TResult>;

  /**
   * Correlates elements from two sequences and preserves unmatched outer elements.
   *
   * @param inner The inner sequence.
   * @param outerKeySelector Selects a key from an outer element.
   * @param innerKeySelector Selects a key from an inner element.
   * @param resultSelector Projects each pair; receives `null` for an unmatched inner element.
   * @param compareSelector Optionally normalizes keys before strict equality comparison.
   * @returns A deferred left-join sequence.
   */
  leftJoin<TInner, TKey, TResult>(
    inner: EnumerableInput<TInner>,
    outerKeySelector: (outer: T) => TKey,
    innerKeySelector: (inner: TInner) => TKey,
    resultSelector: (outer: T, inner: TInner | null) => TResult,
    compareSelector?: (obj: TKey) => unknown,
  ): IEnumerable<TResult>;

  /**
   * Correlates two sequences while retaining every element from the inner sequence.
   *
   * @param inner The sequence whose elements are always retained.
   * @param outerKeySelector Selects a key from an outer element.
   * @param innerKeySelector Selects a key from an inner element.
   * @param resultSelector Creates a result from a matching pair. The outer value is `null` when
   * no match exists.
   * @param compareSelector Optionally normalizes keys before strict equality comparison.
   * @returns A deferred right outer join in inner-sequence order.
   */
  rightJoin<TInner, TKey, TResult>(
    inner: EnumerableInput<TInner>,
    outerKeySelector: (outer: T) => TKey,
    innerKeySelector: (inner: TInner) => TKey,
    resultSelector: (outer: T | null, inner: TInner) => TResult,
    compareSelector?: (obj: TKey) => unknown,
  ): IEnumerable<TResult>;

  /**
   * Correlates each outer element with all inner elements having an equal comparison key.
   *
   * @param inner The inner sequence.
   * @param outerKeySelector Selects a key from an outer element.
   * @param innerKeySelector Selects a key from an inner element.
   * @param resultSelector Projects an outer element and its possibly empty inner group.
   * @param compareSelector Optionally normalizes keys before strict equality comparison.
   * @returns A deferred grouped-join sequence.
   */
  groupJoin<TInner, TKey, TResult>(
    inner: EnumerableInput<TInner>,
    outerKeySelector: (outer: T) => TKey,
    innerKeySelector: (inner: TInner) => TKey,
    resultSelector: (outer: T, inner: IEnumerable<TInner>) => TResult,
    compareSelector?: (obj: TKey) => unknown,
  ): IEnumerable<TResult>;

  /**
   * Determines whether every element satisfies a predicate.
   *
   * @param predicate Tests each element.
   * @returns `true` for an empty sequence or when every element passes; otherwise, `false`.
   */
  all(predicate: (element: T) => boolean): boolean;

  /**
   * Determines whether the sequence contains an element, optionally matching a predicate.
   *
   * @param predicate Optionally tests each element.
   * @returns `true` as soon as a matching element is found; otherwise, `false`.
   */
  any(predicate?: (element: T) => boolean): boolean;

  /** @returns `true` when the sequence contains no elements; otherwise, `false`. */
  isEmpty(): boolean;

  /**
   * Appends one or more sequences.
   *
   * @param sequences The sequences to append in order.
   * @returns A deferred concatenated sequence.
   */
  concat(...sequences: EnumerableInput<T>[]): IEnumerable<T>;

  /**
   * Returns the source followed by one additional element.
   *
   * @param element The element placed after the source.
   * @returns A deferred sequence ending with `element`.
   */
  append(element: T): IEnumerable<T>;

  /**
   * Returns one additional element followed by the source.
   *
   * @param element The element placed before the source.
   * @returns A deferred sequence beginning with `element`.
   */
  prepend(element: T): IEnumerable<T>;

  /**
   * Inserts a sequence before the element at a zero-based index.
   *
   * @param index The insertion index. Values outside the source range append the sequence.
   * @param second The sequence to insert.
   * @returns A deferred sequence containing the inserted elements.
   */
  insert(index: number, second: EnumerableInput<T>): IEnumerable<T>;

  /**
   * Places a value or sequence between each pair of source elements.
   *
   * @param alternateValue The value or sequence to insert between adjacent elements.
   * @returns A deferred sequence with separators.
   */
  alternate(alternateValue: T | EnumerableInput<T>): IEnumerable<T>;

  /**
   * Determines whether an element with the same comparison key exists.
   *
   * @param value The value to find.
   * @param compareSelector Optionally selects a key compared with strict equality.
   * @returns `true` when a matching element is found; otherwise, `false`.
   */
  contains<TCompare>(value: T, compareSelector?: (element: T) => TCompare): boolean;

  /**
   * Supplies one fallback element when the source is empty.
   *
   * @param defaultValue The fallback value. It defaults to `undefined`.
   * @returns A deferred sequence containing the source or one fallback element.
   */
  defaultIfEmpty(defaultValue?: T): IEnumerable<T>;

  /**
   * Removes duplicate comparison keys while preserving first-occurrence order.
   *
   * @param compareSelector Optionally selects a key compared with `Set` semantics.
   * @returns A deferred sequence of distinct elements.
   */
  distinct<TCompare>(compareSelector?: (element: T) => TCompare): IEnumerable<T>;

  /**
   * Returns the first element associated with each distinct selected key.
   *
   * @param keySelector Selects a key from each element.
   * @param compareSelector Optionally normalizes keys before `Set` equality comparison.
   * @returns A deferred sequence preserving first-occurrence order.
   */
  distinctBy<TKey, TCompare = TKey>(
    keySelector: (element: T) => TKey,
    compareSelector?: (key: TKey) => TCompare,
  ): IEnumerable<T>;

  /**
   * Removes consecutive elements with duplicate comparison keys.
   *
   * @param compareSelector Optionally selects a key compared with strict equality.
   * @returns A deferred sequence containing the first element from each adjacent run.
   */
  distinctUntilChanged<TCompare>(compareSelector?: (element: T) => TCompare): IEnumerable<T>;

  /**
   * Produces the distinct elements whose comparison keys do not occur in another sequence.
   *
   * @param second The sequence of values to exclude.
   * @param compareSelector Optionally selects a key compared with `Set` semantics.
   * @returns A deferred set-difference sequence.
   */
  except<TCompare>(
    second: EnumerableInput<T>,
    compareSelector?: (element: T) => TCompare,
  ): IEnumerable<T>;

  /**
   * Returns distinct source elements whose selected keys are absent from a key sequence.
   *
   * @param second The keys to exclude.
   * @param keySelector Selects a key from each source element.
   * @param compareSelector Optionally normalizes keys before `Set` equality comparison.
   * @returns A deferred set-difference sequence in source order.
   */
  exceptBy<TKey, TCompare = TKey>(
    second: EnumerableInput<TKey>,
    keySelector: (element: T) => TKey,
    compareSelector?: (key: TKey) => TCompare,
  ): IEnumerable<T>;

  /**
   * Produces the distinct elements whose comparison keys occur in both sequences.
   *
   * @param second The sequence to intersect with this sequence.
   * @param compareSelector Optionally selects a key compared with `Set` semantics.
   * @returns A deferred intersection sequence in first-sequence order.
   */
  intersect<TCompare>(
    second: EnumerableInput<T>,
    compareSelector?: (element: T) => TCompare,
  ): IEnumerable<T>;

  /**
   * Returns distinct source elements whose selected keys occur in a key sequence.
   *
   * @param second The keys to retain.
   * @param keySelector Selects a key from each source element.
   * @param compareSelector Optionally normalizes keys before `Set` equality comparison.
   * @returns A deferred intersection sequence in source order.
   */
  intersectBy<TKey, TCompare = TKey>(
    second: EnumerableInput<TKey>,
    keySelector: (element: T) => TKey,
    compareSelector?: (key: TKey) => TCompare,
  ): IEnumerable<T>;

  /**
   * Produces the distinct elements from this sequence followed by another sequence.
   *
   * @param second The second sequence.
   * @param compareSelector Optionally selects a key compared with `Set` semantics.
   * @returns A deferred union sequence preserving first-occurrence order.
   */
  union<TCompare>(
    second: EnumerableInput<T>,
    compareSelector?: (element: T) => TCompare,
  ): IEnumerable<T>;

  /**
   * Returns the first element associated with each distinct selected key across two sequences.
   *
   * @param second The sequence appended before duplicate removal.
   * @param keySelector Selects a key from each element.
   * @param compareSelector Optionally normalizes keys before `Set` equality comparison.
   * @returns A deferred union preserving first-occurrence order.
   */
  unionBy<TKey, TCompare = TKey>(
    second: EnumerableInput<T>,
    keySelector: (element: T) => TKey,
    compareSelector?: (key: TKey) => TCompare,
  ): IEnumerable<T>;

  /**
   * Determines whether two sequences have equal comparison keys in the same order.
   *
   * @param second The sequence to compare with this sequence.
   * @param compareSelector Optionally selects a key compared with strict equality.
   * @returns `true` when lengths and corresponding keys are equal; otherwise, `false`.
   */
  sequenceEqual<TCompare>(
    second: EnumerableInput<T>,
    compareSelector?: (element: T) => TCompare,
  ): boolean;

  /**
   * Orders elements by an ascending key while preserving source order for equal keys.
   *
   * @param keySelector Selects the key for each element.
   * @param comparer Optionally compares two keys; negative values sort the first key earlier.
   * @returns An ordered sequence that is sorted when enumerated.
   */
  orderBy<TKey>(
    keySelector: (element: T) => TKey,
    comparer?: Comparer<TKey>,
  ): IOrderedEnumerable<T>;

  /**
   * Orders elements by a descending key while preserving source order for equal keys.
   *
   * @param keySelector Selects the key for each element.
   * @param comparer Optionally compares two keys before the result is reversed.
   * @returns An ordered sequence that is sorted when enumerated.
   */
  orderByDescending<TKey>(
    keySelector: (element: T) => TKey,
    comparer?: Comparer<TKey>,
  ): IOrderedEnumerable<T>;

  /** @returns A deferred sequence containing all elements in reverse order. */
  reverse(): IEnumerable<T>;

  /** @returns A deferred sequence randomly permuted with `Math.random()` on each enumeration. */
  shuffle(): IEnumerable<T>;

  /**
   * Repeatedly samples elements with replacement according to non-negative weights.
   *
   * @param weightSelector Selects each element's weight; negative weights are treated as zero.
   * @returns An infinite deferred sequence, or an empty sequence when the total weight is zero.
   */
  weightedSample(weightSelector: (element: T) => number): IEnumerable<T>;

  /**
   * Groups elements by key.
   *
   * @param keySelector Selects the key for each element.
   * @returns An eager grouping represented as a sequence in first-key occurrence order.
   */
  groupBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;

  /**
   * Groups projected elements by key.
   *
   * @param keySelector Selects the key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @returns An eager grouping represented as a sequence in first-key occurrence order.
   */
  groupBy<TKey, TElement>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
  ): IEnumerable<IGrouping<TKey, TElement>>;

  /**
   * Groups projected elements by key and projects each resulting group.
   *
   * @param keySelector Selects the key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @param resultSelector Projects each key and group.
   * @returns A sequence of projected groups in first-key occurrence order.
   */
  groupBy<TKey, TElement, TResult>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
    resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult,
  ): IEnumerable<TResult>;

  /**
   * Groups projected elements by a normalized comparison key and projects each group.
   *
   * @param keySelector Selects the original key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @param resultSelector Projects each first-occurring original key and its group.
   * @param compareSelector Normalizes keys before `Map` equality comparison.
   * @returns A sequence of projected groups in first-key occurrence order.
   */
  groupBy<TKey, TElement, TResult, TCompare>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
    resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult,
    compareSelector: (key: TKey) => TCompare,
  ): IEnumerable<TResult>;

  /**
   * Groups adjacent elements having the same key.
   *
   * @param keySelector Selects the key for each element.
   * @returns A deferred sequence of contiguous groups.
   */
  partitionBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;

  /**
   * Groups adjacent projected elements having the same key.
   *
   * @param keySelector Selects the key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @returns A deferred sequence of contiguous groups.
   */
  partitionBy<TKey, TElement>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
  ): IEnumerable<IGrouping<TKey, TElement>>;

  /**
   * Groups adjacent projected elements by key and projects each group.
   *
   * @param keySelector Selects the key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @param resultSelector Projects each key and contiguous group.
   * @returns A deferred sequence of projected contiguous groups.
   */
  partitionBy<TKey, TElement, TResult>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
    resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult,
  ): IEnumerable<TResult>;

  /**
   * Groups adjacent projected elements by a normalized key and projects each group.
   *
   * @param keySelector Selects the original key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @param resultSelector Projects each first key in a contiguous run and its group.
   * @param compareSelector Normalizes keys before strict equality comparison.
   * @returns A deferred sequence of projected contiguous groups.
   */
  partitionBy<TKey, TElement, TResult, TCompare>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
    resultSelector: (key: TKey, elements: IEnumerable<TElement>) => TResult,
    compareSelector: (key: TKey) => TCompare,
  ): IEnumerable<TResult>;

  /**
   * Splits the source into arrays containing at most `count` elements.
   *
   * @param count The maximum number of elements in each buffer.
   * @returns A deferred sequence of non-empty buffers.
   * @throws {RangeError} When `count` is not greater than zero.
   */
  buffer(count: number): IEnumerable<T[]>;

  /**
   * Aggregates the sequence without a seed, using the first element as the accumulator.
   *
   * @param func Combines the current accumulator and next element.
   * @returns The final accumulated value.
   * @throws {Error} When the source sequence is empty.
   */
  aggregate(func: (prev: T, current: T) => T): T;

  /**
   * Aggregates the sequence from an initial seed.
   *
   * @param seed The initial accumulator value.
   * @param func Combines the current accumulator and each element.
   * @returns The final accumulated value, or the seed for an empty sequence.
   */
  aggregate<TAccumulate>(
    seed: TAccumulate,
    func: (prev: TAccumulate, current: T) => TAccumulate,
  ): TAccumulate;

  /**
   * Aggregates the sequence from a seed and projects the final accumulator.
   *
   * @param seed The initial accumulator value.
   * @param func Combines the current accumulator and each element.
   * @param resultSelector Projects the final accumulator.
   * @returns The projected final accumulation.
   */
  aggregate<TAccumulate, TResult>(
    seed: TAccumulate,
    func: (prev: TAccumulate, current: T) => TAccumulate,
    resultSelector: (last: TAccumulate) => TResult,
  ): TResult;

  /**
   * Aggregates elements independently for each selected key.
   *
   * @param keySelector Selects a key from each element.
   * @param seed The initial accumulator value used for every key.
   * @param accumulator Updates a key's accumulator with one source element.
   * @param compareSelector Optionally normalizes keys before `Map` equality comparison.
   * @returns A deferred sequence of key and aggregate pairs in first-key order.
   */
  aggregateBy<TKey, TAccumulate>(
    keySelector: (element: T) => TKey,
    seed: TAccumulate,
    accumulator: (accumulate: TAccumulate, element: T) => TAccumulate,
    compareSelector?: (key: TKey) => unknown,
  ): IEnumerable<KeyValuePair<TKey, TAccumulate>>;

  /**
   * Computes the arithmetic mean of selected numeric values.
   *
   * @param selector Optionally converts each element to a number.
   * @returns The mean, or `NaN` for an empty sequence.
   */
  average(selector?: (element: T) => number): number;

  /**
   * Counts all elements or only those matching a predicate.
   *
   * @param predicate Optionally tests each element and its zero-based index.
   * @returns The number of matching elements.
   */
  count(predicate?: (element: T, index: number) => boolean): number;

  /**
   * Counts elements independently for each selected key.
   *
   * @param keySelector Selects a key from each element.
   * @param compareSelector Optionally normalizes keys before `Map` equality comparison.
   * @returns A deferred sequence of key and count pairs in first-key order.
   */
  countBy<TKey>(
    keySelector: (element: T) => TKey,
    compareSelector?: (key: TKey) => unknown,
  ): IEnumerable<KeyValuePair<TKey, number>>;

  /**
   * Finds the greatest selected numeric value.
   *
   * @param selector Optionally converts each element to a number.
   * @returns The maximum, or `-Infinity` for an empty sequence.
   */
  max(selector?: (element: T) => number): number;

  /**
   * Finds the least selected numeric value.
   *
   * @param selector Optionally converts each element to a number.
   * @returns The minimum, or `Infinity` for an empty sequence.
   */
  min(selector?: (element: T) => number): number;

  /**
   * Finds the first element having the greatest selected key.
   *
   * @param keySelector Selects the comparison key for each element.
   * @returns The element with the greatest key.
   * @throws {Error} When the source sequence is empty.
   */
  maxBy<TKey>(keySelector: (element: T) => TKey): T;

  /**
   * Finds the first element having the least selected key.
   *
   * @param keySelector Selects the comparison key for each element.
   * @returns The element with the least key.
   * @throws {Error} When the source sequence is empty.
   */
  minBy<TKey>(keySelector: (element: T) => TKey): T;

  /**
   * Adds selected numeric values.
   *
   * @param selector Optionally converts each element to a number.
   * @returns The sum, or zero for an empty sequence.
   */
  sum(selector?: (element: T) => number): number;

  /**
   * Gets the element at a zero-based index.
   *
   * @param index The index of the element to return.
   * @returns The element at `index`.
   * @throws {Error} When no element exists at the requested index.
   */
  elementAt(index: number): T;

  /**
   * Gets the element at a zero-based index or a fallback value.
   *
   * @param index The index of the element to return.
   * @param defaultValue The value returned when the index is outside the sequence.
   * @returns The indexed element, `defaultValue`, or `undefined`.
   */
  elementAtOrDefault(index: number, defaultValue?: T): T | undefined;

  /**
   * Gets the first element accepted by a type-guard predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns The first accepted element, narrowed by the predicate.
   * @throws {Error} When no matching element exists.
   */
  first<TOther extends T>(predicate: (element: T, index: number) => element is TOther): TOther;

  /**
   * Gets the first element, optionally restricted by a predicate.
   *
   * @param predicate Optionally tests each element and its zero-based index.
   * @returns The first matching element.
   * @throws {Error} When no matching element exists.
   */
  first(predicate?: (element: T, index: number) => boolean): T;

  /**
   * Gets the first matching element or a supplied fallback.
   *
   * @param predicate Tests each element and its zero-based index.
   * @param defaultValue The value returned when no element matches.
   * @returns The first matching element or `defaultValue`.
   */
  firstOrDefault<TDefault>(
    predicate: (element: T, index: number) => boolean,
    defaultValue: TDefault,
  ): T | TDefault;

  /**
   * Gets the first element accepted by a type guard or a supplied fallback.
   *
   * @param predicate Tests and narrows each element.
   * @param defaultValue The value returned when no element matches.
   * @returns The first narrowed element or `defaultValue`.
   */
  firstOrDefault<TOther extends T, TDefault>(
    predicate: (element: T, index: number) => element is TOther,
    defaultValue: TDefault,
  ): TOther | TDefault;

  /**
   * Gets the first element, first matching element, or a fallback.
   *
   * @param predicate An optional predicate. When omitted, the first element is returned.
   * @returns The first matching element, or `undefined` when no element matches.
   */
  firstOrDefault(predicate?: (element: T, index: number) => boolean): T | undefined;

  /**
   * Gets the first element or a supplied fallback.
   *
   * @param defaultValue The value returned when the sequence is empty.
   * @returns The first element or `defaultValue`.
   */
  firstOrDefault<TDefault>(defaultValue: TDefault): T | TDefault;

  /**
   * Gets the last element accepted by a type-guard predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns The last accepted element, narrowed by the predicate.
   * @throws {Error} When no matching element exists.
   */
  last<TOther extends T>(predicate: (element: T, index: number) => element is TOther): TOther;

  /**
   * Gets the last element, optionally restricted by a predicate.
   *
   * @param predicate Optionally tests each element and its zero-based index.
   * @returns The last matching element.
   * @throws {Error} When no matching element exists.
   */
  last(predicate?: (element: T, index: number) => boolean): T;

  /**
   * Gets the last matching element or a supplied fallback.
   *
   * @param predicate Tests each element and its zero-based index.
   * @param defaultValue The value returned when no element matches.
   * @returns The last matching element or `defaultValue`.
   */
  lastOrDefault<TDefault>(
    predicate: (element: T, index: number) => boolean,
    defaultValue: TDefault,
  ): T | TDefault;

  /**
   * Gets the last element accepted by a type guard or a supplied fallback.
   *
   * @param predicate Tests and narrows each element.
   * @param defaultValue The value returned when no element matches.
   * @returns The last narrowed element or `defaultValue`.
   */
  lastOrDefault<TOther extends T, TDefault>(
    predicate: (element: T, index: number) => element is TOther,
    defaultValue: TDefault,
  ): TOther | TDefault;

  /**
   * Gets the last element, last matching element, or `undefined`.
   *
   * @param predicate Optionally tests each element and its zero-based index.
   * @returns The last matching element, or `undefined` when no element matches.
   */
  lastOrDefault(predicate?: (element: T, index: number) => boolean): T | undefined;

  /**
   * Gets the last element or a supplied fallback.
   *
   * @param defaultValue The value returned when the sequence is empty.
   * @returns The last element or `defaultValue`.
   */
  lastOrDefault<TDefault>(defaultValue: TDefault): T | TDefault;

  /**
   * Gets the only element accepted by a type-guard predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns The sole accepted element, narrowed by the predicate.
   * @throws {Error} When zero or more than one matching element exists.
   */
  single<TOther extends T>(predicate: (element: T, index: number) => element is TOther): TOther;

  /**
   * Gets the only element, optionally restricted by a predicate.
   *
   * @param predicate Optionally tests each element and its zero-based index.
   * @returns The sole matching element.
   * @throws {Error} When zero or more than one matching element exists.
   */
  single(predicate?: (element: T, index: number) => boolean): T;

  /**
   * Gets the only matching element or a supplied fallback.
   *
   * @param predicate Tests each element and its zero-based index.
   * @param defaultValue The value returned when no element matches.
   * @returns The sole matching element or `defaultValue`.
   * @throws {Error} When more than one element matches.
   */
  singleOrDefault<TDefault>(
    predicate: (element: T, index: number) => boolean,
    defaultValue: TDefault,
  ): T | TDefault;

  /**
   * Gets the only element accepted by a type guard or a supplied fallback.
   *
   * @param predicate Tests and narrows each element.
   * @param defaultValue The value returned when no element matches.
   * @returns The sole narrowed element or `defaultValue`.
   * @throws {Error} When more than one element matches.
   */
  singleOrDefault<TOther extends T, TDefault>(
    predicate: (element: T, index: number) => element is TOther,
    defaultValue: TDefault,
  ): TOther | TDefault;

  /**
   * Gets the only element, only matching element, or `undefined`.
   *
   * @param predicate Optionally tests each element and its zero-based index.
   * @returns The sole matching element, or `undefined` when none matches.
   * @throws {Error} When more than one element matches.
   */
  singleOrDefault(predicate?: (element: T, index: number) => boolean): T | undefined;

  /**
   * Gets the only element or a supplied fallback.
   *
   * @param defaultValue The value returned when the sequence is empty.
   * @returns The sole element or `defaultValue`.
   * @throws {Error} When the sequence contains more than one element.
   */
  singleOrDefault<TDefault>(defaultValue: TDefault): T | TDefault;

  /**
   * Bypasses a number of elements.
   *
   * @param count The number of elements to skip; non-positive values skip none.
   * @returns A deferred sequence containing the remaining elements.
   */
  skip(count: number): IEnumerable<T>;

  /**
   * Bypasses elements while a predicate remains true.
   *
   * @param predicate Tests each candidate element and its zero-based index.
   * @returns A deferred sequence beginning with the first rejected element.
   */
  skipWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;

  /**
   * Returns at most a specified number of leading elements.
   *
   * @param count The maximum number to return; non-positive values return an empty sequence.
   * @returns A deferred prefix of the source sequence.
   */
  take(count: number): IEnumerable<T>;

  /**
   * Returns leading elements while a predicate remains true.
   *
   * @param predicate Tests each candidate element and its zero-based index.
   * @returns A deferred sequence ending before the first rejected element.
   */
  takeWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;

  /**
   * Returns every element except a number of trailing elements.
   *
   * @param count The number to omit; defaults to one, and non-positive values omit none.
   * @returns A deferred sequence without the requested suffix.
   */
  takeExceptLast(count?: number): IEnumerable<T>;

  /**
   * Returns every element except a number of trailing elements.
   *
   * @param count The number of trailing elements to omit.
   * @returns A deferred sequence without the requested suffix.
   */
  skipLast(count: number): IEnumerable<T>;

  /**
   * Returns up to a specified number of trailing elements.
   *
   * @param count The suffix length; non-positive values return an empty sequence.
   * @returns A deferred sequence that buffers the source before producing the suffix.
   */
  takeFromLast(count: number): IEnumerable<T>;

  /**
   * Returns up to a specified number of trailing elements.
   *
   * @param count The suffix length; non-positive values return an empty sequence.
   * @returns A deferred sequence that buffers the source before producing the suffix.
   */
  takeLast(count: number): IEnumerable<T>;

  /**
   * Selects a one-based page.
   *
   * @param pageNumber The one-based page number; values below one select the first page.
   * @param pageSize The maximum number of elements in the page.
   * @returns A deferred page of elements.
   */
  page(pageNumber: number, pageSize: number): IEnumerable<T>;

  /**
   * Selects a one-based page described by an object.
   *
   * @param info The page number and page size.
   * @returns A deferred page of elements.
   */
  page(info: IPageInfo): IEnumerable<T>;

  /**
   * Finds the first index of an element using strict equality.
   *
   * @param item The element to find.
   * @returns The zero-based index, or `-1` when the element is absent.
   */
  indexOf(item: T): number;

  /**
   * Finds the first index accepted by a predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns The first accepted index, or `-1` when no element matches.
   */
  indexOf(predicate: (element: T, index: number) => boolean): number;

  /**
   * Finds the last index of an element using strict equality.
   *
   * @param item The element to find.
   * @returns The final zero-based index, or `-1` when the element is absent.
   */
  lastIndexOf(item: T): number;

  /**
   * Finds the last index accepted by a predicate.
   *
   * @param predicate Tests each element and its zero-based index.
   * @returns The final accepted index, or `-1` when no element matches.
   */
  lastIndexOf(predicate: (element: T, index: number) => boolean): number;

  /** @returns A deferred wrapper that hides the source sequence's concrete identity. */
  asEnumerable(): IEnumerable<T>;

  /**
   * Reinterprets the element type without runtime conversion or validation.
   *
   * @returns This sequence typed as `IEnumerable<TResult>`.
   */
  cast<TResult>(): IEnumerable<TResult>;

  /** @returns A newly allocated array containing all source elements. */
  toArray(): T[];

  /**
   * Materializes the sequence into a native `Set`.
   *
   * @returns A set containing each distinct value in first-occurrence order.
   */
  toSet(): Set<T>;

  /**
   * Creates a lookup by grouping source elements under selected keys.
   *
   * @param keySelector Selects the key for each source element.
   * @returns A lookup whose groups contain the original elements.
   */
  toLookup<TKey>(keySelector: (element: T) => TKey): ILookup<TKey, T>;

  /**
   * Creates a lookup from selected keys and values.
   *
   * @param keySelector Selects the key for each source element.
   * @param elementSelector Selects the value stored in each group.
   * @param compareSelector Optionally normalizes keys before `Map` equality comparison.
   * @returns A lookup containing all selected values grouped by key.
   */
  toLookup<TKey, TElement>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement,
    compareSelector?: (key: TKey) => unknown,
  ): ILookup<TKey, TElement>;

  /**
   * Creates an object from selected property keys and values.
   *
   * @param keySelector Selects a property key for each element.
   * @param elementSelector Optionally selects the property value.
   * @returns An object whose later values overwrite earlier values with the same key.
   */
  toObject<TKey extends PropertyKey, TElement = T>(
    keySelector: (element: T) => TKey,
    elementSelector?: (element: T) => TElement,
  ): Record<TKey, TElement>;

  /**
   * Creates a dictionary using each source element as its value.
   *
   * @param keySelector Selects a key for each element.
   * @returns A dictionary containing the source elements.
   */
  toDictionary<TKey>(keySelector: (element: T) => TKey): IDictionary<TKey, T>;

  /**
   * Creates a dictionary from selected keys and values.
   *
   * @param keySelector Selects a key for each element.
   * @param elementSelector Selects a value for each element.
   * @param compareSelector Optionally normalizes keys before `Map` equality comparison.
   * @returns A dictionary whose later values overwrite earlier equal comparison keys.
   */
  toDictionary<TKey, TValue>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TValue,
    compareSelector?: (key: TKey) => unknown,
  ): IDictionary<TKey, TValue>;

  /**
   * Serializes all source elements as a JSON array.
   *
   * @param replacer A JSON replacer function or property allowlist.
   * @param space The indentation used in the serialized output.
   * @returns The JSON representation of the materialized sequence.
   */
  toJSONString(
    replacer?: ((key: string, value: unknown) => unknown) | (string | number)[],
    space?: string | number,
  ): string;

  /**
   * Joins the string representations of all elements.
   *
   * @param separator The text inserted between adjacent elements; defaults to an empty string.
   * @returns The joined string.
   */
  toJoinedString(separator?: string): string;

  /**
   * Projects each element and joins the resulting string representations.
   *
   * @param separator The text inserted between adjacent projected values.
   * @param selector Projects each element and its zero-based index.
   * @returns The joined string.
   */
  toJoinedString<TResult>(
    separator: string,
    selector: (element: T, index: number) => TResult,
  ): string;

  /**
   * Joins the string representations of all elements.
   *
   * @param separator The text inserted between adjacent elements.
   * @returns The joined string.
   */
  joinWith(separator: string): string;

  /**
   * Inserts a computed separator after every element except the last.
   *
   * @param separator Selects the separator that follows each non-final element.
   * @returns A deferred sequence alternating source elements and separators.
   */
  joinWith(separator: (element: T) => T): IEnumerable<T>;

  /**
   * Creates a native `Map` from selected keys and values.
   *
   * @param keySelector Selects a key for each element.
   * @param valueSelector Selects a value for each element.
   * @returns A map whose later values overwrite earlier values with the same key.
   */
  toMap<K, V>(keySelector: (element: T) => K, valueSelector: (element: T) => V): Map<K, V>;

  /**
   * Splits the source into arrays containing at most `size` elements.
   *
   * @param size A positive integer specifying the maximum chunk size.
   * @returns A deferred sequence of non-empty chunks.
   * @throws {RangeError} When `size` is not a positive integer.
   */
  chunk(size: number): IEnumerable<T[]>;

  /** @returns A deferred sequence pairing every element with its zero-based index. */
  index(): IEnumerable<Indexed<T>>;

  /** @returns A deferred sequence describing each element's index and boundary position. */
  position(): IEnumerable<Positioned<T>>;

  /** @returns A deferred sequence pairing each element with its previous and next neighbors. */
  withNeighbors(): IEnumerable<Neighbors<T>>;

  /**
   * Performs an action as elements are enumerated and passes the elements through unchanged.
   *
   * @param action Receives each element and index. Returning `false` stops the sequence.
   * @returns A deferred sequence that invokes `action` during enumeration.
   */
  doAction(action: (element: T, index: number) => void): IEnumerable<T>;
  doAction(action: (element: T, index: number) => boolean): IEnumerable<T>;

  /**
   * Eagerly enumerates the sequence and performs an action for each element.
   *
   * @param action Receives each element and index. Returning `false` stops enumeration.
   */
  forEach(action: (element: T, index: number) => void): void;
  forEach(action: (element: T, index: number) => boolean): void;

  /**
   * Eagerly consumes the entire sequence without retaining its elements.
   *
   * This is useful for triggering deferred side effects. It does not terminate for an infinite
   * sequence unless an earlier operator bounds that sequence.
   */
  force(): void;

  /**
   * Passes the complete source sequence to a function and enumerates its returned sequence.
   *
   * @param func Creates a sequence from this sequence.
   * @returns A deferred sequence over the function result.
   */
  letBind<TResult>(
    func: (source: IEnumerable<T>) => EnumerableInput<TResult>,
  ): IEnumerable<TResult>;

  /**
   * Creates a sequence whose consumers share one forward-only source iterator.
   *
   * @returns A disposable sequence that distributes successive source elements among consumers.
   */
  share(): IDisposableEnumerable<T>;

  /**
   * Creates a sequence that caches elements as they are requested for subsequent enumerations.
   *
   * @returns A disposable sequence backed by a single source iterator and a growing cache.
   */
  memoize(): IDisposableEnumerable<T>;

  /**
   * Handles an error raised while enumerating the source and then completes the sequence.
   *
   * @param handler Receives the caught error.
   * @returns A deferred sequence that suppresses source errors after invoking the handler.
   */
  catchError(handler: ((exception: unknown) => void)): IEnumerable<T>;

  /**
   * Runs an action after enumeration completes, fails, or is stopped by the consumer.
   *
   * @param action The cleanup action to execute exactly once per enumeration.
   * @returns A deferred sequence that passes source elements through unchanged.
   */
  finallyAction(action: () => void): IEnumerable<T>;

  /**
   * Logs each selected value with `console.log` as the sequence is enumerated.
   *
   * @param selector Optionally selects the value to log.
   * @returns A deferred sequence that passes source elements through unchanged.
   */
  log<TValue>(selector?: (element: T) => TValue): IEnumerable<T>;

  /**
   * Logs a message and each selected value as the sequence is enumerated.
   *
   * @param message The message prefix; defaults to `"Trace"`.
   * @param selector Optionally selects the value to log.
   * @returns A deferred sequence that passes source elements through unchanged.
   */
  trace<TValue>(message?: string, selector?: (element: T) => TValue): IEnumerable<T>;
}

/** A sequence with one or more stable ordering criteria. */
export interface IOrderedEnumerable<T> extends IEnumerable<T> {
  /**
   * Appends an ordering criterion.
   *
   * @param keySelector Selects the key for each element.
   * @param comparer Optionally compares two keys.
   * @param descending Whether to apply this criterion in descending order.
   * @returns A new ordered sequence containing the additional criterion.
   */
  createOrderedEnumerable<TKey>(
    keySelector: (element: T) => TKey,
    comparer?: Comparer<TKey>,
    descending?: boolean,
  ): IOrderedEnumerable<T>;

  /**
   * Appends an ascending ordering criterion.
   *
   * @param keySelector Selects the key for each element.
   * @param comparer Optionally compares two keys.
   * @returns A new ordered sequence containing the additional criterion.
   */
  thenBy<TKey>(
    keySelector: (element: T) => TKey,
    comparer?: Comparer<TKey>,
  ): IOrderedEnumerable<T>;

  /**
   * Appends a descending ordering criterion.
   *
   * @param keySelector Selects the key for each element.
   * @param comparer Optionally compares two keys before the result is reversed.
   * @returns A new ordered sequence containing the additional criterion.
   */
  thenByDescending<TKey>(
    keySelector: (element: T) => TKey,
    comparer?: Comparer<TKey>,
  ): IOrderedEnumerable<T>;
}

/** A sequence backed by resources that can be released before natural completion. */
export interface IDisposableEnumerable<T> extends IEnumerable<T> {
  /** Releases the underlying iterator. Repeated calls have no effect. */
  dispose(): void;
}

/** Associates a key with one value. */
export interface KeyValuePair<TKey, TValue> {
  /** The entry's original key. */
  key: TKey;

  /** The entry's value. */
  value: TValue;
}

/** A mutable key-value collection with optional normalized-key comparison. */
export interface IDictionary<TKey, TValue> {
  /**
   * Adds or replaces a value under a key.
   *
   * @param key The key to store.
   * @param value The associated value.
   */
  add(key: TKey, value: TValue): void;

  /**
   * Gets the value associated with a key.
   *
   * @param key The key to find.
   * @returns The associated value, or `undefined` at runtime when the key is absent.
   */
  get(key: TKey): TValue;

  /**
   * Adds or replaces a value under a key.
   *
   * @param key The key to store.
   * @param value The associated value.
   * @returns `true` when an existing entry was replaced; otherwise, `false`.
   */
  set(key: TKey, value: TValue): boolean;

  /**
   * Tests whether a key exists.
   *
   * @param key The key to find.
   * @returns `true` when the dictionary contains the key; otherwise, `false`.
   */
  contains(key: TKey): boolean;

  /** Removes every entry from the dictionary. */
  clear(): void;

  /**
   * Removes an entry when it exists.
   *
   * @param key The key to remove.
   */
  remove(key: TKey): void;

  /** @returns The number of entries in the dictionary. */
  count(): number;

  /** @returns A deferred sequence of entries in insertion order. */
  toEnumerable(): IEnumerable<KeyValuePair<TKey, TValue>>;
}

/** A read-only one-to-many mapping produced by grouping operations. */
export interface ILookup<TKey, TElement> {
  /** @returns The number of distinct comparison keys. */
  count(): number;

  /**
   * Gets all elements associated with a key.
   *
   * @param key The key to find.
   * @returns A group for the key, or an empty group when the key is absent.
   */
  get(key: TKey): IEnumerable<TElement>;

  /**
   * Tests whether a key exists.
   *
   * @param key The key to find.
   * @returns `true` when the lookup contains the key; otherwise, `false`.
   */
  contains(key: TKey): boolean;

  /** @returns A deferred sequence of groups in first-key insertion order. */
  toEnumerable(): IEnumerable<IGrouping<TKey, TElement>>;
}

/** A sequence of elements that share a key. */
export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  /** @returns The group's original key. */
  key(): TKey;

  /**
   * Gets the array that stores the group's elements.
   *
   * @returns The live backing array; modifying it changes subsequent group enumeration.
   */
  getSource(): TElement[];
}

/** Describes a one-based page request. */
export interface IPageInfo {
  /** The one-based page number. Values below one select the first page. */
  pageNumber: number;

  /** The maximum number of elements in the page. */
  pageSize: number;
}

/** Associates a sequence element with its zero-based index. */
export interface Indexed<T> {
  /** The element's zero-based index. */
  index: number;

  /** The sequence element. */
  item: T;
}

/** Describes an element's index and position within a sequence. */
export interface Positioned<T> extends Indexed<T> {
  /** Whether this is the first element. */
  isFirst: boolean;

  /** Whether this is the last element. */
  isLast: boolean;
}

/** Associates an element with its immediate neighbors. */
export interface Neighbors<T> {
  /** The previous element, or `null` for the first element. */
  prev: T | null;

  /** The current element. */
  item: T;

  /** The next element, or `null` for the last element. */
  next: T | null;
}

/** @deprecated Use {@link Indexed} instead. */
export type IndexedItem<T> = Indexed<T>;

/** @deprecated Use {@link Positioned} instead. */
export type PositionedItem<T> = Positioned<T>;

/** @deprecated Use {@link Neighbors} instead. */
export type ItemWithNeighbors<T> = Neighbors<T>;

/** Compares two values, returning a negative, zero, or positive number. */
export type Comparer<T> = (first: T, second: T) => number;

/** A sequence value accepted by operators: a linqx sequence, iterable, or array-like object. */
export type EnumerableInput<T> = IEnumerable<T> | Iterable<T> | ArrayLike<T>;

import { EnumerableSequence } from './core/enumerable.js';
import { OrderedEnumerable } from './core/ordered-enumerable.js';
import { choice } from './factories/choice.js';
import { cycle } from './factories/cycle.js';
import { defer } from './factories/defer.js';
import { empty } from './factories/empty.js';
import { from } from './factories/from.js';
import { generate } from './factories/generate.js';
import { make } from './factories/make.js';
import { matches } from './factories/matches.js';
import { range } from './factories/range.js';
import { rangeDown } from './factories/range-down.js';
import { rangeTo } from './factories/range-to.js';
import { repeat } from './factories/repeat.js';
import { repeatWithFinalize } from './factories/repeat-with-finalize.js';
import { toInfinity } from './factories/to-infinity.js';
import { toNegativeInfinity } from './factories/to-negative-infinity.js';
import { unfold } from './factories/unfold.js';
import { instanceOperators } from './operators/operators.js';
import { Utils } from './utils.js';
import type {
  IDictionary as DictionaryInterface,
  IDisposableEnumerable as DisposableEnumerableInterface,
  IEnumerable as EnumerableInterface,
  IEnumerator as EnumeratorInterface,
  IGrouping as GroupingInterface,
  ILookup as LookupInterface,
  IOrderedEnumerable as OrderedEnumerableInterface,
  IPageInfo as PageInfo,
  Indexed as IndexedValue,
  Neighbors as NeighborValues,
  Positioned as PositionedValue,
} from './types.js';

Object.assign(EnumerableSequence.prototype, instanceOperators);
Object.assign(OrderedEnumerable.prototype, instanceOperators);

/** Entry point for creating and working with LINQ-style sequences. */
export class Enumerable {
  /** Low-level helpers for creating enumerables and extending iterable prototypes. */
  static readonly Utils = Utils;

  /** Creates an infinite sequence that randomly chooses from the supplied values. */
  static readonly choice = choice;

  /** Creates an infinite sequence that repeatedly emits the supplied values in order. */
  static readonly cycle = cycle;

  /** Defers sequence creation until each enumeration begins. */
  static readonly defer = defer;

  /** Creates an empty sequence. */
  static readonly empty = empty;

  /** Converts an enumerable source, iterator, array-like value, object, or scalar to a sequence. */
  static readonly from = from;

  /** Generates values by repeatedly invoking a function. */
  static readonly generate = generate;

  /** Creates a sequence containing one element. */
  static readonly make = make;

  /** Enumerates all regular-expression matches in a string. */
  static readonly matches = matches;

  /** Creates a counted numeric sequence. */
  static readonly range = range;

  /** Creates a counted descending numeric sequence. */
  static readonly rangeDown = rangeDown;

  /** Creates an inclusive numeric sequence between two endpoints. */
  static readonly rangeTo = rangeTo;

  /** Repeats an element a specified number of times or indefinitely. */
  static readonly repeat = repeat;

  /** Repeats an initialized resource until enumeration stops, then finalizes it. */
  static readonly repeatWithFinalize = repeatWithFinalize;

  /** Creates an infinite ascending numeric sequence. */
  static readonly toInfinity = toInfinity;

  /** Creates an infinite descending numeric sequence. */
  static readonly toNegativeInfinity = toNegativeInfinity;

  /** Creates an infinite sequence by repeatedly transforming the previous value. */
  static readonly unfold = unfold;
}

Object.assign(Enumerable.prototype, instanceOperators);

/** Type contracts exposed through the `Enumerable` namespace. */
export namespace Enumerable {
  /** A composable iterable sequence with LINQ-style query operators. */
  export type IEnumerable<T> = EnumerableInterface<T>;

  /** An imperative cursor over a sequence. */
  export type IEnumerator<T> = EnumeratorInterface<T>;

  /** A sequence with one or more stable ordering criteria. */
  export type IOrderedEnumerable<T> = OrderedEnumerableInterface<T>;

  /** A sequence whose backing iterator can be explicitly released. */
  export type IDisposableEnumerable<T> = DisposableEnumerableInterface<T>;

  /** A mutable key-value collection with optional normalized-key comparison. */
  export type IDictionary<TKey, TValue> = DictionaryInterface<TKey, TValue>;

  /** A read-only one-to-many mapping. */
  export type ILookup<TKey, TElement> = LookupInterface<TKey, TElement>;

  /** A sequence of elements associated with a key. */
  export type IGrouping<TKey, TElement> = GroupingInterface<TKey, TElement>;

  /** A one-based page number and page size. */
  export type IPageInfo = PageInfo;

  /** A sequence element paired with its zero-based index. */
  export type Indexed<T> = IndexedValue<T>;

  /** A sequence element annotated with index and boundary information. */
  export type Positioned<T> = PositionedValue<T>;

  /** A sequence element paired with its immediate neighbors. */
  export type Neighbors<T> = NeighborValues<T>;

  /** @deprecated Use {@link Indexed} instead. */
  export type IndexedItem<T> = Indexed<T>;

  /** @deprecated Use {@link Positioned} instead. */
  export type PositionedItem<T> = Positioned<T>;

  /** @deprecated Use {@link Neighbors} instead. */
  export type ItemWithNeighbors<T> = Neighbors<T>;
}

export default Enumerable;

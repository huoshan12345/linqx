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
  IndexedItem as Indexed,
  ItemWithNeighbors as Neighbors,
  PositionedItem as Positioned,
} from './types.js';

Object.assign(EnumerableSequence.prototype, instanceOperators);
Object.assign(OrderedEnumerable.prototype, instanceOperators);

export class Enumerable {
  static readonly Utils = Utils;
  static readonly choice = choice;
  static readonly cycle = cycle;
  static readonly defer = defer;
  static readonly empty = empty;
  static readonly from = from;
  static readonly generate = generate;
  static readonly make = make;
  static readonly matches = matches;
  static readonly range = range;
  static readonly rangeDown = rangeDown;
  static readonly rangeTo = rangeTo;
  static readonly repeat = repeat;
  static readonly repeatWithFinalize = repeatWithFinalize;
  static readonly toInfinity = toInfinity;
  static readonly toNegativeInfinity = toNegativeInfinity;
  static readonly unfold = unfold;
}

Object.assign(Enumerable.prototype, instanceOperators);

export namespace Enumerable {
  export type IEnumerable<T> = EnumerableInterface<T>;
  export type IEnumerator<T> = EnumeratorInterface<T>;
  export type IOrderedEnumerable<T> = OrderedEnumerableInterface<T>;
  export type IDisposableEnumerable<T> = DisposableEnumerableInterface<T>;
  export type IDictionary<TKey, TValue> = DictionaryInterface<TKey, TValue>;
  export type ILookup<TKey, TElement> = LookupInterface<TKey, TElement>;
  export type IGrouping<TKey, TElement> = GroupingInterface<TKey, TElement>;
  export type IPageInfo = PageInfo;
  export type IndexedItem<T> = Indexed<T>;
  export type PositionedItem<T> = Positioned<T>;
  export type ItemWithNeighbors<T> = Neighbors<T>;
}

export default Enumerable;

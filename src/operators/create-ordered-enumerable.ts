import type { Comparer, IOrderedEnumerable } from '../types.js';
import { OrderedEnumerable } from '../core/ordered-enumerable.js';
import { defaultComparer } from '../internal/functions.js';

export function createOrderedEnumerable<T, TKey>(
  this: IOrderedEnumerable<T>,
  keySelector: (element: T) => TKey,
  comparer: Comparer<TKey> = defaultComparer,
  descending = false,
): IOrderedEnumerable<T> {
  if (!(this instanceof OrderedEnumerable)) {
    throw new TypeError('Source is not an ordered enumerable.');
  }

  return new OrderedEnumerable(this.source, [
    ...this.criteria,
    { keySelector, comparer: comparer as Comparer<unknown>, descending },
  ]);
}

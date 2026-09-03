import type { Comparer, IEnumerable, IOrderedEnumerable } from '../types.js';
import { OrderedEnumerable } from '../core/ordered-enumerable.js';
import { defaultComparer } from '../internal/functions.js';

export function orderBy<T, TKey>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  comparer: Comparer<TKey> = defaultComparer,
): IOrderedEnumerable<T> {
  return new OrderedEnumerable(this, [{
    keySelector,
    comparer: comparer as Comparer<unknown>,
    descending: false,
  }]);
}

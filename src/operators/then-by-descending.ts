import type { Comparer, IOrderedEnumerable } from '../types.js';

export function thenByDescending<T, TKey>(this: IOrderedEnumerable<T>, keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): IOrderedEnumerable<T> {
  return this.createOrderedEnumerable(keySelector, comparer, true);
}

import type { Comparer, IOrderedEnumerable } from '../types.js';

export function thenBy<T, TKey>(this: IOrderedEnumerable<T>, keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): IOrderedEnumerable<T> {
  return this.createOrderedEnumerable(keySelector, comparer, false);
}

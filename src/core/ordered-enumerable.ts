import type { Comparer, IOrderedEnumerable } from '../types.js';
import { EnumerableSequence } from './enumerable.js';

export interface SortCriterion<T> {
  keySelector: (element: T) => unknown;
  comparer: Comparer<unknown>;
  descending: boolean;
}

export class OrderedEnumerable<T> extends EnumerableSequence<T> {
  constructor(readonly source: Iterable<T>, readonly criteria: readonly SortCriterion<T>[]) {
    super(() => {
      const indexed = Array.from(source, (value, index) => ({ value, index }));
      indexed.sort((left, right) => {
        for (const criterion of criteria) {
          const comparison = criterion.comparer(
            criterion.keySelector(left.value),
            criterion.keySelector(right.value),
          );

          if (comparison !== 0) {
            return criterion.descending ? -comparison : comparison;
          }
        }

        return left.index - right.index;
      });
      return indexed.map(entry => entry.value)[Symbol.iterator]();
    });
  }
}

export interface OrderedEnumerable<T> extends IOrderedEnumerable<T> {}

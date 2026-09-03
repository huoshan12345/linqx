import type { IEnumerable } from '../types.js';
import { Grouping } from '../core/grouping.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

export function partitionBy<T, TKey, TElement = T, TResult = import('../types.js').IGrouping<TKey, TElement>>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  elementSelector: (element: T) => TElement = identity as (element: T) => TElement,
  resultSelector: ((key: TKey, elements: IEnumerable<TElement>) => TResult) | undefined = undefined,
  compareSelector: (key: TKey) => unknown = identity,
): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* () {
    let hasGroup = false;
    let key!: TKey;
    let comparisonKey: unknown;
    let elements: TElement[] = [];

    const emit = (): TResult => {
      const group = new Grouping(key, elements);
      return resultSelector ? resultSelector(key, group) : group as unknown as TResult;
    };

    for (const element of source) {
      const currentKey = keySelector(element);
      const currentComparisonKey = compareSelector(currentKey);
      if (hasGroup && currentComparisonKey !== comparisonKey) {
        yield emit();
        elements = [];
      }
      if (!hasGroup || currentComparisonKey !== comparisonKey) {
        key = currentKey;
        comparisonKey = currentComparisonKey;
        hasGroup = true;
      }
      elements.push(elementSelector(element));
    }
    if (hasGroup) yield emit();
  });
}

import type { IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';

export function groupBy<T, TKey, TElement = T, TResult = import('../types.js').IGrouping<TKey, TElement>>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  elementSelector: (element: T) => TElement = identity as (element: T) => TElement,
  resultSelector: ((key: TKey, elements: IEnumerable<TElement>) => TResult) | undefined = undefined,
  compareSelector: (key: TKey) => unknown = identity,
): IEnumerable<TResult> {
  const lookup = this.toLookup(keySelector, elementSelector, compareSelector);
  return lookup.toEnumerable().select(group => resultSelector
    ? resultSelector(group.key(), group)
    : group as unknown as TResult);
}

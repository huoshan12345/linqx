import type { IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';

export function toObject<T, TKey extends PropertyKey, TElement = T>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  elementSelector: (element: T) => TElement = identity as (element: T) => TElement,
): Record<TKey, TElement> {
  const result = {} as Record<TKey, TElement>;
  for (const element of this) {
    result[keySelector(element)] = elementSelector(element);
  }

  return result;
}

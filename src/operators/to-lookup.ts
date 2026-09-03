import type { IEnumerable, ILookup } from '../types.js';
import { Lookup } from '../core/lookup.js';
import { identity } from '../internal/functions.js';

export function toLookup<T, TKey, TElement = T>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  elementSelector: (element: T) => TElement = identity as (element: T) => TElement,
  compareSelector: (key: TKey) => unknown = identity,
): ILookup<TKey, TElement> {
  const lookup = new Lookup<TKey, TElement>(compareSelector);
  for (const element of this) lookup.add(keySelector(element), elementSelector(element));
  return lookup;
}

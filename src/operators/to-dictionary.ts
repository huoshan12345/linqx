import type { IDictionary, IEnumerable } from '../types.js';
import { Dictionary } from '../core/dictionary.js';
import { identity } from '../internal/functions.js';

export function toDictionary<T, TKey, TValue = T>(
  this: IEnumerable<T>, keySelector: (element: T) => TKey,
  elementSelector: (element: T) => TValue = identity as (element: T) => TValue,
  compareSelector: (key: TKey) => unknown = identity,
): IDictionary<TKey, TValue> {
  const dictionary = new Dictionary<TKey, TValue>(compareSelector);
  for (const element of this) dictionary.add(keySelector(element), elementSelector(element));
  return dictionary;
}

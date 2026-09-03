import type { IEnumerable } from '../types.js';

export function toMap<T, TKey, TValue>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  valueSelector: (element: T) => TValue,
): Map<TKey, TValue> {
  const result = new Map<TKey, TValue>();

  for (const element of this) {
    result.set(keySelector(element), valueSelector(element));
  }

  return result;
}

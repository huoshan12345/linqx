import type { IEnumerable } from '../types.js';
import { defaultComparer } from '../internal/functions.js';

export function minBy<T, TKey>(this: IEnumerable<T>, keySelector: (element: T) => TKey): T {
  const iterator = this[Symbol.iterator]();
  const first = iterator.next();
  if (first.done) throw new Error('Sequence contains no elements.');
  let result = first.value;
  let key = keySelector(result);
  for (let next = iterator.next(); !next.done; next = iterator.next()) {
    const nextKey = keySelector(next.value);
    if (defaultComparer(nextKey, key) < 0) { result = next.value; key = nextKey; }
  }
  return result;
}

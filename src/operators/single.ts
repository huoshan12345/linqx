import type { IEnumerable } from '../types.js';

export function single<T>(this: IEnumerable<T>, predicate?: (element: T, index: number) => boolean): T {
  let found = false;
  let result!: T;
  let index = 0;
  for (const element of this) {
    if (predicate && !predicate(element, index++)) continue;
    if (found) throw new Error('Sequence contains more than one matching element.');
    found = true;
    result = element;
  }
  if (!found) throw new Error('Sequence contains no matching element.');
  return result;
}

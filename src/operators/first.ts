import type { IEnumerable } from '../types.js';

export function first<T>(
  this: IEnumerable<T>,
  predicate?: (element: T, index: number) => boolean,
): T {
  let index = 0;

  for (const element of this) {
    if (!predicate || predicate(element, index++)) {
      return element;
    }
  }

  throw new Error('Sequence contains no matching element.');
}

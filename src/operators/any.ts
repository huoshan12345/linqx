import type { IEnumerable } from '../types.js';

export function any<T>(this: IEnumerable<T>, predicate?: (element: T) => boolean): boolean {
  for (const element of this) {
    if (!predicate || predicate(element)) {
      return true;
    }
  }

  return false;
}

import type { IEnumerable } from '../types.js';

export function all<T>(this: IEnumerable<T>, predicate: (element: T) => boolean): boolean {
  for (const element of this) {
    if (!predicate(element)) {
      return false;
    }
  }

  return true;
}

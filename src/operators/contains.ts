import type { IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';

export function contains<T, TCompare>(
  this: IEnumerable<T>,
  value: T,
  compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare,
): boolean {
  const expected = compareSelector(value);

  for (const element of this) {
    if (compareSelector(element) === expected) {
      return true;
    }
  }

  return false;
}

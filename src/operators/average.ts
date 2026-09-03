import type { IEnumerable } from '../types.js';

export function average<T>(this: IEnumerable<T>, selector: (element: T) => number = Number): number {
  let total = 0;
  let count = 0;
  for (const element of this) { total += selector(element); count++; }
  return total / count;
}

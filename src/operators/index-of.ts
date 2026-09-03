import type { IEnumerable } from '../types.js';

export function indexOf<T>(this: IEnumerable<T>, itemOrPredicate: T | ((element: T, index: number) => boolean)): number {
  const predicate = typeof itemOrPredicate === 'function'
    ? itemOrPredicate as (element: T, index: number) => boolean
    : (element: T) => element === itemOrPredicate;
  let index = 0;
  for (const element of this) {
    if (predicate(element, index)) return index;
    index++;
  }
  return -1;
}

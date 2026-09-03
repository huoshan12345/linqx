import type { IEnumerable } from '../types.js';

export function count<T>(this: IEnumerable<T>, predicate?: (element: T, index: number) => boolean): number {
  let result = 0;
  let index = 0;
  for (const element of this) if (!predicate || predicate(element, index++)) result++;
  return result;
}

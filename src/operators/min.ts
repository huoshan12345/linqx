import type { IEnumerable } from '../types.js';

export function min<T>(this: IEnumerable<T>, selector: (element: T) => number = Number): number {
  let result = Infinity;
  for (const element of this) {
    result = Math.min(result, selector(element));
  }

  return result;
}

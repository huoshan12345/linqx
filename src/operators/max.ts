import type { IEnumerable } from '../types.js';

export function max<T>(this: IEnumerable<T>, selector: (element: T) => number = Number): number {
  let result = -Infinity;
  for (const element of this) {
    result = Math.max(result, selector(element));
  }

  return result;
}

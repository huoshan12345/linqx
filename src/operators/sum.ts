import type { IEnumerable } from '../types.js';

export function sum<T>(this: IEnumerable<T>, selector: (element: T) => number = Number): number {
  let result = 0;
  for (const element of this) result += selector(element);
  return result;
}

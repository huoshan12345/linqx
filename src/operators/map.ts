import type { IEnumerable } from '../types.js';

export function map<T, TResult>(
  this: IEnumerable<T>,
  selector: (element: T, index: number) => TResult,
): TResult[] {
  return this.select(selector).toArray();
}

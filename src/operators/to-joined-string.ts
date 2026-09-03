import type { IEnumerable } from '../types.js';

export function toJoinedString<T, TResult = T>(this: IEnumerable<T>, separator = '', selector?: (element: T, index: number) => TResult): string {
  return Array.from(this, (element, index) => selector ? selector(element, index) : element as unknown as TResult).join(separator);
}

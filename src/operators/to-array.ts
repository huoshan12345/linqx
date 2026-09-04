import type { IEnumerable } from '../types.js';

export function toArray<T>(this: IEnumerable<T>): T[] {
  return [...this];
}

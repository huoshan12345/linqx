import type { IEnumerable } from '../types.js';

export function toSet<T>(this: IEnumerable<T>): Set<T> {
  return new Set(this);
}

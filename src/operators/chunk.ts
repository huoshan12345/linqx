import type { IEnumerable } from '../types.js';

export function chunk<T>(this: IEnumerable<T>, size: number): IEnumerable<T[]> {
  if (!Number.isInteger(size) || size <= 0) throw new RangeError('Chunk size must be a positive integer.');
  return this.buffer(size);
}

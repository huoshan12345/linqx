import type { IEnumerable } from '../types.js';
import { range } from './range.js';

/**
 * Creates a counted descending arithmetic sequence.
 *
 * @param start The first value.
 * @param count The number of values; non-positive values produce an empty sequence.
 * @param step The absolute decrement between consecutive values; defaults to one.
 * @returns A deferred descending numeric sequence.
 */
export function rangeDown(start: number, count: number, step = 1): IEnumerable<number> {
  return range(start, count, -Math.abs(step));
}

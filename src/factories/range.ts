import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates a counted arithmetic sequence.
 *
 * @param start The first value.
 * @param count The number of values; non-positive values produce an empty sequence.
 * @param step The difference between consecutive values; defaults to one.
 * @returns A deferred numeric sequence.
 */
export function range(start: number, count: number, step = 1): IEnumerable<number> {
  return fromGenerator(function* () {
    for (let index = 0; index < count; index++) {
      yield start + index * step;
    }
  });
}

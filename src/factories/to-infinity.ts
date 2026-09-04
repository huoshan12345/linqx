import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates an infinite ascending arithmetic sequence.
 *
 * @param start The first value; defaults to zero.
 * @param step The amount added after each element; defaults to one.
 * @returns An infinite deferred numeric sequence.
 */
export function toInfinity(start = 0, step = 1): IEnumerable<number> {
  return fromGenerator(function* () {
    for (let value = start; ; value += step) {
      yield value;
    }
  });
}

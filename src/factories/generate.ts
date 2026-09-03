import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Generates elements by repeatedly invoking a function.
 *
 * @param func Produces the next element.
 * @param count The number of elements to produce. Omit it for an infinite sequence.
 * @returns A deferred generated sequence.
 */
export function generate<T>(func: () => T, count?: number): IEnumerable<T> {
  return fromGenerator(function* () {
    for (let index = 0; count == null || index < count; index++) {
      yield func();
    }
  });
}

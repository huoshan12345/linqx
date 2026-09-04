import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Repeats one element.
 *
 * @param element The value to repeat.
 * @param count The number of repetitions. Omit it for an infinite sequence.
 * @returns A deferred repeated sequence.
 */
export function repeat<T>(element: T, count?: number): IEnumerable<T> {
  return fromGenerator(function* () {
    for (let index = 0; count == null || index < count; index++) {
      yield element;
    }
  });
}

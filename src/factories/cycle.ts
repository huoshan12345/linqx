import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates a sequence that repeatedly emits a fixed set of values in order.
 *
 * @param values The values in each cycle.
 * @returns An infinite deferred sequence, or an empty sequence when no values are supplied.
 */
export function cycle<T>(...values: T[]): IEnumerable<T> {
  return fromGenerator(function* () {
    while (values.length > 0) {
      yield* values;
    }
  });
}

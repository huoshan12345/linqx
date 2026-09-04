import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates a sequence that randomly selects from a fixed set with replacement.
 *
 * @param values The candidate values.
 * @returns An infinite deferred sequence, or an empty sequence when no values are supplied.
 */
export function choice<T>(...values: T[]): IEnumerable<T> {
  return fromGenerator(function* () {
    while (values.length > 0) {
      const index = Math.floor(Math.random() * values.length);
      yield values[index]!;
    }
  });
}

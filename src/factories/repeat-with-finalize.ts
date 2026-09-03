import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Initializes one value, repeats it indefinitely, and finalizes it when enumeration stops.
 *
 * @param initializer Creates the value once per enumeration.
 * @param finalizer Releases the value after completion, failure, or early termination.
 * @returns An infinite deferred sequence with deterministic finalization.
 */
export function repeatWithFinalize<T>(
  initializer: () => T,
  finalizer: (element: T) => void,
): IEnumerable<T> {
  return fromGenerator(function* () {
    const value = initializer();

    try {
      while (true) {
        yield value;
      }
    } finally {
      finalizer(value);
    }
  });
}

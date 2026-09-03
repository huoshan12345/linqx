import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates an infinite sequence by repeatedly transforming the previous value.
 *
 * @param seed The first value.
 * @param func Produces the next value from the current value.
 * @returns An infinite deferred sequence beginning with `seed`.
 */
export function unfold<T>(seed: T, func: (value: T) => T): IEnumerable<T> {
  return fromGenerator(function* () {
    let value = seed;

    while (true) {
      yield value;
      value = func(value);
    }
  });
}

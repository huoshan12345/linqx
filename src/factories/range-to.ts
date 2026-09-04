import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates an arithmetic sequence between two inclusive endpoints.
 *
 * The direction is inferred from the endpoints and the absolute value of `step` is used.
 *
 * @param start The first value.
 * @param to The inclusive endpoint.
 * @param step The non-zero distance between consecutive values; defaults to one.
 * @returns A deferred numeric sequence.
 */
export function rangeTo(start: number, to: number, step = 1): IEnumerable<number> {
  const distance = Math.abs(step);
  return fromGenerator(function* () {
    if (start <= to) {
      for (let value = start; value <= to; value += distance) {
        yield value;
      }
    } else {
      for (let value = start; value >= to; value -= distance) {
        yield value;
      }
    }
  });
}

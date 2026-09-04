import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Creates a sequence containing exactly one element.
 *
 * @param element The element to contain.
 * @returns A reusable single-element sequence.
 */
export function make<T>(element: T): IEnumerable<T> {
  return fromGenerator(function* () {
    yield element;
  });
}

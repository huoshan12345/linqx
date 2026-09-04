import type { IEnumerable } from '../types.js';
import { createEnumerable } from '../internal/create-enumerable.js';

/**
 * Defers creation of a sequence until enumeration begins.
 *
 * @param factory Creates the sequence used by each enumeration.
 * @returns A deferred sequence that invokes `factory` once per enumeration.
 */
export function defer<T>(factory: () => IEnumerable<T>): IEnumerable<T> {
  return createEnumerable(() => factory()[Symbol.iterator]());
}

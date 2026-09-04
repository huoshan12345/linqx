import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/** @returns A reusable sequence containing no elements. */
export function empty<T>(): IEnumerable<T> {
  return fromGenerator(function* () {});
}

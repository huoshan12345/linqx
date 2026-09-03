import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function cycle<T>(...values: T[]): IEnumerable<T> {
  return fromGenerator(function* () { while (values.length) yield* values; });
}

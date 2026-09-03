import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function asEnumerable<T>(this: IEnumerable<T>): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () { yield* source; });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function generate<T>(func: () => T, count?: number): IEnumerable<T> {
  return fromGenerator(function* () {
    for (let index = 0; count == null || index < count; index++) {
      yield func();
    }
  });
}

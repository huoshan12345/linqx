import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function choice<T>(...values: T[]): IEnumerable<T> {
  return fromGenerator(function* () {
    while (values.length > 0) {
      const index = Math.floor(Math.random() * values.length);
      yield values[index]!;
    }
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function range(start: number, count: number, step = 1): IEnumerable<number> {
  return fromGenerator(function* () {
    for (let index = 0; index < count; index++) {
      yield start + index * step;
    }
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

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

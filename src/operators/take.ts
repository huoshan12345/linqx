import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function take<T>(this: IEnumerable<T>, count: number): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    if (count <= 0) return;
    let index = 0;
    for (const element of source) {
      yield element;
      if (++index >= count) return;
    }
  });
}

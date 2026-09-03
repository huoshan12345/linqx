import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function skip<T>(this: IEnumerable<T>, count: number): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let index = 0;
    for (const element of source) if (index++ >= count) yield element;
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function skipWhile<T>(this: IEnumerable<T>, predicate: (element: T, index: number) => boolean): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let yielding = false;
    let index = 0;
    for (const element of source) {
      if (!yielding && !predicate(element, index++)) yielding = true;
      if (yielding) yield element;
    }
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function takeWhile<T>(this: IEnumerable<T>, predicate: (element: T, index: number) => boolean): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let index = 0;
    for (const element of source) {
      if (!predicate(element, index++)) return;
      yield element;
    }
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function joinWith<T>(this: IEnumerable<T>, separator: string | ((element: T) => T)): string | IEnumerable<T> {
  if (typeof separator === 'string') return this.toJoinedString(separator);
  const source = this;
  return fromGenerator(function* () {
    const iterator = source[Symbol.iterator]();
    let current = iterator.next();
    while (!current.done) {
      yield current.value;
      const next = iterator.next();
      if (next.done) return;
      yield separator(current.value);
      current = next;
    }
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function choose<T>(this: IEnumerable<T>, selector: (element: T, index: number) => T): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let index = 0;
    for (const element of source) {
      const selected = selector(element, index++);
      if (selected != null) yield selected;
    }
  });
}

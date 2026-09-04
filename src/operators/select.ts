import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function select<T, TResult>(
  this: IEnumerable<T>,
  selector: (element: T, index: number) => TResult,
): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* () {
    let index = 0;
    for (const element of source) {
      yield selector(element, index++);
    }
  });
}

import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function ofType<T, TResult>(this: IEnumerable<T>, type: unknown): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* () {
    for (const element of source) {
      let matches: boolean;

      if (type === Number) {
        matches = typeof element === 'number';
      } else if (type === String) {
        matches = typeof element === 'string';
      } else if (type === Boolean) {
        matches = typeof element === 'boolean';
      } else {
        matches = typeof type === 'function' && element instanceof type;
      }

      if (matches) {
        yield element as unknown as TResult;
      }
    }
  });
}

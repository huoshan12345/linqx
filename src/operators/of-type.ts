import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function ofType<T, TResult>(this: IEnumerable<T>, type: unknown): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* () {
    for (const element of source) {
      const matches = type === Number ? typeof element === 'number'
        : type === String ? typeof element === 'string'
        : type === Boolean ? typeof element === 'boolean'
        : typeof type === 'function' && element instanceof type;
      if (matches) yield element as unknown as TResult;
    }
  });
}

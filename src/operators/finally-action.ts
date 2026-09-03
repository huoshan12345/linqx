import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function finallyAction<T>(this: IEnumerable<T>, action: () => void): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    try {
      yield* source;
    } finally {
      action();
    }
  });
}

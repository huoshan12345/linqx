import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function repeatWithFinalize<T>(initializer: () => T, finalizer: (element: T) => void): IEnumerable<T> {
  return fromGenerator(function* () {
    const value = initializer();
    try { while (true) yield value; }
    finally { finalizer(value); }
  });
}

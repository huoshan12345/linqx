import type { IEnumerable } from '../types.js';

export function force<T>(this: IEnumerable<T>): void {
  for (const _ of this) {
    // Iterating the entire source forces deferred operations to run.
  }
}

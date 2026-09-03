import type { IDisposableEnumerable, IEnumerable } from '../types.js';
import { SharedEnumerable } from '../core/shared-enumerable.js';

export function share<T>(this: IEnumerable<T>): IDisposableEnumerable<T> {
  return new SharedEnumerable(this);
}

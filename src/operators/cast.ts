import type { IEnumerable } from '../types.js';

export function cast<T, TResult>(this: IEnumerable<T>): IEnumerable<TResult> {
  return this as unknown as IEnumerable<TResult>;
}

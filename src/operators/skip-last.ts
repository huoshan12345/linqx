import type { IEnumerable } from '../types.js';
import { takeExceptLast } from './take-except-last.js';

export function skipLast<T>(this: IEnumerable<T>, count: number): IEnumerable<T> {
  return (takeExceptLast<T>).call(this, count);
}

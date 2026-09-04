import type { IEnumerable } from '../types.js';
import { takeFromLast } from './take-from-last.js';

export function takeLast<T>(this: IEnumerable<T>, count: number): IEnumerable<T> {
  return (takeFromLast<T>).call(this, count);
}

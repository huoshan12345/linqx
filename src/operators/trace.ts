import type { IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';

export function trace<T, TValue = T>(
  this: IEnumerable<T>,
  message = 'Trace',
  selector: (element: T) => TValue = identity as (element: T) => TValue,
): IEnumerable<T> {
  return this.doAction(element => {
    console.log(`${message}:`, selector(element));
  });
}

import type { IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';

export function log<T, TValue = T>(this: IEnumerable<T>, selector: (element: T) => TValue = identity as (element: T) => TValue): IEnumerable<T> {
  return this.doAction(element => console.log(selector(element)));
}

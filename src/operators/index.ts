import type { IEnumerable, Indexed } from '../types.js';

export function index<T>(this: IEnumerable<T>): IEnumerable<Indexed<T>> {
  return this.select((item, itemIndex) => ({ index: itemIndex, item }));
}

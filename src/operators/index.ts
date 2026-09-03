import type { IEnumerable, IndexedItem } from '../types.js';

export function index<T>(this: IEnumerable<T>): IEnumerable<IndexedItem<T>> {
  return this.select((item, itemIndex) => ({ index: itemIndex, item }));
}

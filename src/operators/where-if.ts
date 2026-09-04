import type { IEnumerable } from '../types.js';

export function whereIf<T>(
  this: IEnumerable<T>,
  flag: boolean | string | undefined | null,
  filter: (element: T) => boolean,
): IEnumerable<T> {
  return flag ? this.where(filter) : this;
}

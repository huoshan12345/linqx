import type { IEnumerable, IPageInfo } from '../types.js';

export function page<T>(this: IEnumerable<T>, pageNumberOrInfo: number | IPageInfo, pageSize?: number): IEnumerable<T> {
  const pageNumber = typeof pageNumberOrInfo === 'number' ? pageNumberOrInfo : pageNumberOrInfo.pageNumber;
  const size = typeof pageNumberOrInfo === 'number' ? pageSize! : pageNumberOrInfo.pageSize;
  return this.skip(Math.max(0, pageNumber - 1) * size).take(size);
}

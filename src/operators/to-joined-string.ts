import type { IEnumerable } from '../types.js';

export function toJoinedString<T, TResult = T>(
  this: IEnumerable<T>,
  separator = '',
  selector?: (element: T, index: number) => TResult,
): string {
  const values = Array.from(this, (element, index) => (
    selector
      ? selector(element, index)
      : element as unknown as TResult
  ));

  return values.join(separator);
}

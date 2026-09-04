import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function doAction<T>(
  this: IEnumerable<T>,
  action: (element: T, index: number) => void,
): IEnumerable<T>;
export function doAction<T>(
  this: IEnumerable<T>,
  action: (element: T, index: number) => boolean,
): IEnumerable<T>;
export function doAction<T>(
  this: IEnumerable<T>,
  action: (element: T, index: number) => unknown,
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let index = 0;
    for (const element of source) {
      if (action(element, index++) === false) {
        return;
      }

      yield element;
    }
  });
}

import type { IEnumerable } from '../types.js';

export function forEach<T>(
  this: IEnumerable<T>,
  action: (element: T, index: number) => void,
): void;
export function forEach<T>(
  this: IEnumerable<T>,
  action: (element: T, index: number) => boolean,
): void;
export function forEach<T>(
  this: IEnumerable<T>,
  action: (element: T, index: number) => unknown,
): void {
  let index = 0;

  for (const element of this) {
    if (action(element, index++) === false) {
      return;
    }
  }
}

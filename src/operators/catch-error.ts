import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function catchError<T>(
  this: IEnumerable<T>,
  handler: (exception: unknown) => void,
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    try {
      yield* source;
    } catch (error) {
      handler(error);
    }
  });
}

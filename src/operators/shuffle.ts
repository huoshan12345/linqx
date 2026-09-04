import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function shuffle<T>(this: IEnumerable<T>): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const values = [...source];
    for (let index = values.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [values[index], values[other]] = [values[other]!, values[index]!];
    }
    yield* values;
  });
}

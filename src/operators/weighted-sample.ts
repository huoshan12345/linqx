import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function weightedSample<T>(this: IEnumerable<T>, weightSelector: (element: T) => number): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const values = Array.from(source);
    const weights = values.map(value => Math.max(0, weightSelector(value)));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    if (total <= 0) return;
    while (true) {
      let sample = Math.random() * total;
      for (let index = 0; index < values.length; index++) {
        sample -= weights[index]!;
        if (sample < 0) {
          yield values[index]!;
          break;
        }
      }
    }
  });
}

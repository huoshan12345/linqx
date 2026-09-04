import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function rightJoin<TOuter, TInner, TKey, TResult>(
  this: IEnumerable<TOuter>,
  inner: EnumerableInput<TInner>,
  outerKeySelector: (outer: TOuter) => TKey,
  innerKeySelector: (inner: TInner) => TKey,
  resultSelector: (outer: TOuter | null, inner: TInner) => TResult,
  compareSelector: (key: TKey) => unknown = identity,
): IEnumerable<TResult> {
  const outer = this;
  return fromGenerator(function* () {
    const lookup = new Map<unknown, TOuter[]>();
    for (const item of outer) {
      const key = compareSelector(outerKeySelector(item));
      const values = lookup.get(key);

      if (values) {
        values.push(item);
      } else {
        lookup.set(key, [item]);
      }
    }

    for (const item of toIterable(inner)) {
      const matches = lookup.get(compareSelector(innerKeySelector(item)));

      if (matches) {
        for (const match of matches) {
          yield resultSelector(match, item);
        }
      } else {
        yield resultSelector(null, item);
      }
    }
  });
}

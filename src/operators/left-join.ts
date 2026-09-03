import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function leftJoin<TOuter, TInner, TKey, TResult>(
  this: IEnumerable<TOuter>, inner: EnumerableInput<TInner>,
  outerKeySelector: (outer: TOuter) => TKey, innerKeySelector: (inner: TInner) => TKey,
  resultSelector: (outer: TOuter, inner: TInner | null) => TResult,
  compareSelector: (key: TKey) => unknown = identity,
): IEnumerable<TResult> {
  const outer = this;
  return fromGenerator(function* () {
    const lookup = new Map<unknown, TInner[]>();
    for (const item of toIterable(inner)) {
      const key = compareSelector(innerKeySelector(item));
      const values = lookup.get(key);
      if (values) values.push(item); else lookup.set(key, [item]);
    }
    for (const item of outer) {
      const matches = lookup.get(compareSelector(outerKeySelector(item)));
      if (matches) for (const match of matches) yield resultSelector(item, match);
      else yield resultSelector(item, null);
    }
  });
}

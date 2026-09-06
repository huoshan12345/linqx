# linqx

Modern fork of the original [linq](https://github.com/mihaifm/linq) for JavaScript.

linqx keeps the familiar LINQ-style API while adding modern exports, new utility methods, improved TypeScript support, and active maintenance.

Written in TypeScript with no runtime dependencies.

---

# Key Differences from linq

## 1. Named Export Added

The original package only exposed a default export.

linqx also provides:

```ts
export { Enumerable };
```

This makes extensions, wrappers, and custom integrations cleaner and more flexible for `typescript`.

Example:

```ts
// enumerable.extensions.ts
import { Enumerable } from "linqx";

declare module "linqx" {
  namespace Enumerable {
    export function crossJoin<T>(this: Enumerable.IEnumerable<T>): Enumerable.IEnumerable<{ left: T; right: T; }>;
  }
}

Enumerable.prototype.crossJoin = function <T>(this: Enumerable.IEnumerable<T>): Enumerable.IEnumerable<{ left: T; right: T; }> {
  return Enumerable.from(crossJoinIterator(this));

  function* crossJoinIterator(enumerable: Enumerable.IEnumerable<T>): Iterable<{ left: T; right: T; }> {
    for (const item of enumerable) {
      for (const otherItem of enumerable) {
        yield { left: item, right: otherItem };
      }
    }
  }
};
```

Useful when augmenting prototypes or writing reusable helpers.

---

## 2. Additional APIs

linqx adds practical methods not available in the original package.


```ts
whereIf(flag, predicate)
page(pageNumber, pageSize)
page({ pageNumber, pageSize })
joinWith(separator)
toMap(keySelector, valueSelector)
chunk(size)
index()
position()
withNeighbors()
append(element)
prepend(element)
skipLast(count)
takeLast(count)
distinctBy(keySelector)
exceptBy(keys, keySelector)
intersectBy(keys, keySelector)
unionBy(sequence, keySelector)
countBy(keySelector)
aggregateBy(keySelector, seed, accumulator)
rightJoin(sequence, outerKeySelector, innerKeySelector, resultSelector)
toSet()
```

---

# Installation

```bash
npm install linqx
```

---

# Usage

## ES Modules

```ts
import Enumerable from "linqx";

const result = Enumerable
  .range(1, 10)
  .where(x => x % 3 === 0)
  .select(x => x * 10)
  .toArray();
```

---

## Named Export

```ts
import { Enumerable } from "linqx";

const values = Enumerable.from([1, 2, 3]);
```

---

## TypeScript

```ts
import Enumerable from "linqx";

const items: Enumerable.IEnumerable<number> = Enumerable.from([1, 2, 3]);
```

## Repeated Enumeration

You can enumerate an `IEnumerable<T>` again only if its source supports it. With arrays,
maps, and sets, each enumeration starts a new iterator. This also applies to the
`asEnumerable()` extensions for arrays, maps, and DOM collections.

A generator object or an existing iterator has a consumption position. Wrapping it with
`Enumerable.from()` does not reset that position:

```ts
import Enumerable from "linqx";

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const once = Enumerable.from(numbers());

once.toArray(); // [1, 2, 3]
once.toArray(); // []: the generator object is exhausted
```

**For repeated enumeration of a generator or iterator, use the factory overload:
`Enumerable.from(() => ...)`. Create a new generator or iterator inside the callback.**

```ts
const reusable = Enumerable.from(() => numbers());

reusable.toArray(); // [1, 2, 3]
reusable.toArray(); // [1, 2, 3]

const query = reusable.where(value => value > 1).select(value => value * 10);

query.toArray(); // [20, 30]
query.toArray(); // [20, 30]

const values = new Set([1, 2, 3]);
const entries = Enumerable.from(() => values.entries());

entries.toArray(); // [[1, 1], [2, 2], [3, 3]]
entries.toArray(); // [[1, 1], [2, 2], [3, 3]]
```

Returning an existing iterator from the callback still shares its consumption position:

```ts
const iterator = numbers();
const stillOnce = Enumerable.from(() => iterator);

stillOnce.toArray(); // [1, 2, 3]
stillOnce.toArray(); // []: the callback returns the same iterator
```

Early termination matters too: calling `any()`, `first()`, or `take(1).toArray()` on a
wrapped generator object closes that generator, so later enumeration returns no values.
Use a factory if you need to enumerate again after these operations.

With a factory, you rerun the generator and query callbacks on each enumeration, including
their side effects. Results can change if the underlying data changes. To reuse cached
values, call `memoize()` before consuming the sequence. Calling `share()` instead opts
into sharing one forward-only iterator among consumers.

## Tutorial

Build the package and run the TypeScript tutorial:

```bash
pnpm tutorial
```

---

## New API Examples

```ts
// whereIf
Enumerable
  .from([1, 2, 3, 4])
  .whereIf(true, x => x > 2)
  .toArray();

// chunk
Enumerable
  .from([1, 2, 3, 4, 5])
  .chunk(2)
  .toArray();
// result: [[1, 2], [3, 4], [5]]

// withNeighbors
for (const { prev, item, next } of Enumerable.from([10, 20, 30]).withNeighbors()) {
}

// position
for (const { index, item, isFirst, isLast } of Enumerable.from(["a", "b", "c"]).position()) {
}

// Standard sequence helpers
Enumerable.from([2, 3]).prepend(1).append(4).toArray();
// result: [1, 2, 3, 4]

Enumerable.from([1, 2, 3, 4]).skipLast(2).toArray();
// result: [1, 2]

Enumerable.from([1, 2, 3, 4]).takeLast(2).toArray();
// result: [3, 4]

// Key-based set operations
Enumerable
  .from([{ id: 1, name: "first" }, { id: 1, name: "second" }])
  .distinctBy(item => item.id)
  .toArray();
// result: [{ id: 1, name: "first" }]

Enumerable
  .from([{ id: 1 }, { id: 2 }, { id: 3 }])
  .exceptBy([2], item => item.id)
  .toArray();
// result: [{ id: 1 }, { id: 3 }]

// Per-key aggregation
Enumerable
  .from(["a", "b", "a"])
  .countBy(value => value)
  .toArray();
// result: [{ key: "a", value: 2 }, { key: "b", value: 1 }]

Enumerable
  .from([{ category: "a", amount: 2 }, { category: "a", amount: 3 }])
  .aggregateBy(item => item.category, 0, (sum, item) => sum + item.amount)
  .toArray();
// result: [{ key: "a", value: 5 }]

// Native Set materialization
Enumerable.from([1, 1, 2]).toSet();
```

`countBy` and `aggregateBy` return
`Enumerable.IEnumerable<Enumerable.KeyValuePair<TKey, TValue>>`. Key-based methods accept an
optional final comparison selector when keys need normalization, such as
`key => key.toLowerCase()` for case-insensitive string keys.

---

# Migration from linq

Most projects can switch directly:

```diff
-import Enumerable from "linq";
+import Enumerable from "linqx";
```

The original string Lambda syntax is no longer supported. Pass JavaScript functions instead:

```ts
// supported
Enumerable.from([1, 2, 3, 4]).where(value => value % 2 === 0);

// not supported
Enumerable.from([1, 2, 3, 4]).where("value => value % 2 === 0");
```

---

# Repository

https://github.com/huoshan12345/linqx

---

# Credits

Based on the original work by Yoshifumi Kawai and later linq maintainers.

Independent community fork.

---

# License

MIT

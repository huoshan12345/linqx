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
```
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

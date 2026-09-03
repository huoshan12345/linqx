import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("firstOrDefault", function () {
    // No arguments.
    strictEqual(arraySequence.firstOrDefault(), 1);
    strictEqual(emptySequence.firstOrDefault(), undefined);

    // No predicate.
    strictEqual(arraySequence.firstOrDefault(0), 1);
    strictEqual(emptySequence.firstOrDefault(0), 0);
    strictEqual(emptySequence.firstOrDefault(undefined), undefined);

    // No default value.
    strictEqual(arraySequence.firstOrDefault(() => true), 1);
    strictEqual(emptySequence.firstOrDefault(() => true), undefined);

    // Both arguments.
    strictEqual(arraySequence.firstOrDefault(() => true, 0), 1);
    strictEqual(emptySequence.firstOrDefault(() => true, 0), 0);
    strictEqual(emptySequence.firstOrDefault(() => true, null), null);
    strictEqual(emptySequence.firstOrDefault(() => true, undefined), undefined);
  });
});

describe("Paging", () => {
  test("firstOrDefault", function () {
    const nonEmpty = Enumerable.range(1, 10);
    const empty = Enumerable.empty();

    // No arguments.
    strictEqual(nonEmpty.firstOrDefault(), 1);
    strictEqual(empty.firstOrDefault(), undefined);

    // No predicate.
    strictEqual(nonEmpty.firstOrDefault(0), 1);
    strictEqual(empty.firstOrDefault(0), 0);
    strictEqual(empty.firstOrDefault(undefined), undefined);

    // No default value.
    strictEqual(nonEmpty.firstOrDefault(() => true), 1);
    strictEqual(empty.firstOrDefault(() => true), undefined);

    // Both arguments.
    strictEqual(nonEmpty.firstOrDefault(() => true, 0), 1);
    strictEqual(empty.firstOrDefault(() => true, 0), 0);
    strictEqual(empty.firstOrDefault(() => true, null), null);
    strictEqual(empty.firstOrDefault(() => true, undefined), undefined);
  });
});
test('firstOrDefault returns undefined when no value or fallback exists', () => {
  expect(Enumerable.empty<number>().firstOrDefault()).toBeUndefined();
});

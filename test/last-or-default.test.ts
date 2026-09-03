import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("lastOrDefault", function () {
    // No arguments.
    strictEqual(arraySequence.lastOrDefault(), 10000);
    strictEqual(emptySequence.lastOrDefault(), undefined);

    // No predicate.
    strictEqual(arraySequence.lastOrDefault(0), 10000);
    strictEqual(emptySequence.lastOrDefault(0), 0);
    strictEqual(emptySequence.lastOrDefault(undefined), undefined);

    // No default value.
    strictEqual(arraySequence.lastOrDefault(() => true), 10000);
    strictEqual(emptySequence.lastOrDefault(() => true), undefined);

    // Both arguments.
    strictEqual(arraySequence.lastOrDefault(() => true, 0), 10000);
    strictEqual(emptySequence.lastOrDefault(() => true, 0), 0);
    strictEqual(emptySequence.lastOrDefault(() => true, null), null);
    strictEqual(emptySequence.lastOrDefault(() => true, undefined), undefined);
  });
});

describe("Paging", () => {
  test("lastOrDefault", function () {
    const nonEmpty = Enumerable.range(1, 10);
    const empty = Enumerable.empty();

    // No arguments.
    strictEqual(nonEmpty.lastOrDefault(), 10);
    strictEqual(empty.lastOrDefault(), undefined);

    // No predicate.
    strictEqual(nonEmpty.lastOrDefault(0), 10);
    strictEqual(empty.lastOrDefault(0), 0);
    strictEqual(empty.lastOrDefault(undefined), undefined);

    // No default value.
    strictEqual(nonEmpty.lastOrDefault(() => true), 10);
    strictEqual(empty.lastOrDefault(() => true), undefined);

    // Both arguments.
    strictEqual(nonEmpty.lastOrDefault(() => true, 0), 10);
    strictEqual(empty.lastOrDefault(() => true, 0), 0);
    strictEqual(empty.lastOrDefault(() => true, null), null);
    strictEqual(empty.lastOrDefault(() => true, undefined), undefined);
  });
});
test('lastOrDefault returns undefined when no value or fallback exists', () => {
  expect(Enumerable.empty<number>().lastOrDefault()).toBeUndefined();
});

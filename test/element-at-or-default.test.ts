import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, strictEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("elementAtOrDefault", function () {
    equal(arraySequence.elementAtOrDefault(4), 10000);
    equal(arraySequence.elementAtOrDefault(-1, -100), -100);
    equal(arraySequence.elementAtOrDefault(5, -100), -100);
  });
});

describe("Paging", () => {
  test("elementAtOrDefault", function () {
    let actual = Enumerable.range(1, 10).elementAtOrDefault(3, 0);
    strictEqual(actual, 4);
    actual = Enumerable.range(1, 10).elementAtOrDefault(31, 0);
    strictEqual(actual, 0);

    const mixedSequence = Enumerable.from<number | string>([1, 2, 3, 4]);
    strictEqual(mixedSequence.elementAtOrDefault(3, "foo"), 4);
    strictEqual(mixedSequence.elementAtOrDefault(31, "foo"), "foo");
  });
});
test('elementAtOrDefault returns undefined when no fallback is supplied', () => {
  expect(Enumerable.make(1).elementAtOrDefault(2)).toBeUndefined();
});

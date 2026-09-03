import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, ok, strictEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("elementAt", function () {
    equal(arraySequence.elementAt(3), 1000);
    try {
      arraySequence.elementAt(-1);
      ok(false);
    }
    catch (e) { ok(true, "okay"); }

    try {
      arraySequence.elementAt(100);
      ok(false);
    }
    catch (e) { ok(true); }
  });
});

describe("Paging", () => {
  test("elementAt", function () {
    const actual = Enumerable.range(1, 10).elementAt(5);
    strictEqual(actual, 6);
  });
});
test('elementAt rejects a negative index', () => {
  expect(() => Enumerable.range(1, 3).elementAt(-1)).toThrow('Index is out of range.');
});

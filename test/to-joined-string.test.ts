import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("toJoinedString", function () {
    equal(arraySequence.toJoinedString(), "110100100010000");
    equal(arraySequence.toJoinedString("-"), "1-10-100-1000-10000");
    equal(arraySequence.toJoinedString("-", (value) => value + 1), "2-11-101-1001-10001");
  });
});

describe("Convert", () => {
  test("toJoinedString", function () {
    let actual = Enumerable.range(1, 3).toJoinedString();
    equal(actual, "123");

    actual = Enumerable.range(1, 3).toJoinedString("-");
    equal(actual, "1-2-3");

    actual = Enumerable.range(1, 3).toJoinedString("-", (i) => i * 2);
    equal(actual, "2-4-6");
  });
});
test('toJoinedString passes zero-based indexes to its selector', () => {
  expect(Enumerable.from(['a', 'b']).toJoinedString(',', (value, index) => value + index))
    .toBe('a0,b1');
});

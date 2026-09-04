import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("toJoinedString", function () {
    expect(arraySequence.toJoinedString()).toBe("110100100010000");
    expect(arraySequence.toJoinedString("-")).toBe("1-10-100-1000-10000");
    expect(arraySequence.toJoinedString("-", (value) => value + 1)).toBe("2-11-101-1001-10001");
  });
});

describe("Convert", () => {
  test("toJoinedString", function () {
    let actual = Enumerable.range(1, 3).toJoinedString();
    expect(actual).toBe("123");

    actual = Enumerable.range(1, 3).toJoinedString("-");
    expect(actual).toBe("1-2-3");

    actual = Enumerable.range(1, 3).toJoinedString("-", (i) => i * 2);
    expect(actual).toBe("2-4-6");
  });
});
test('toJoinedString passes zero-based indexes to its selector', () => {
  expect(Enumerable.from(['a', 'b']).toJoinedString(',', (value, index) => value + index))
    .toBe('a0,b1');
});

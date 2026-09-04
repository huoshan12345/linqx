import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Convert", () => {
  test("toJSONString", function () {
    let actual = Enumerable.from([{ a: 1, b: true }, { a: null, b: "aaa" }]).toJSONString();
    expect(actual).toBe('[{"a":1,"b":true},{"a":null,"b":"aaa"}]');

    actual = Enumerable.range(1, 5).toJSONString();
    expect(actual).toBe('[1,2,3,4,5]');

    actual = Enumerable.from(["a", "b", "c"])
      .toJSONString(function (_key, value) {
        if (value === null || value === undefined || typeof value === 'object') return value;
        return value.toString().toUpperCase();
      });
    expect(actual).toBe('["A","B","C"]');

    actual = Enumerable.from([1, 2, 3, 4, 5])
      .toJSONString(function (_key, value) { return value; }, 1);
    expect(actual.indexOf("\n") !== -1).toBe(true);
  });
});
test('toJSONString serializes an empty sequence as an empty array', () => {
  expect(Enumerable.empty<number>().toJSONString()).toBe('[]');
});

test('toJSONString accepts a property allowlist', () => {
  expect(Enumerable.make({ keep: 1, omit: 2 }).toJSONString(['keep'])).toBe('[{"keep":1}]');
});

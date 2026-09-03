import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, ok, test } from './test-utils.js';

describe("Convert", () => {
  test("toJSONString", function () {
    let actual = Enumerable.from([{ a: 1, b: true }, { a: null, b: "aaa" }]).toJSONString();
    equal(actual, '[{"a":1,"b":true},{"a":null,"b":"aaa"}]');

    actual = Enumerable.range(1, 5).toJSONString();
    equal(actual, '[1,2,3,4,5]');

    actual = Enumerable.from(["a", "b", "c"])
      .toJSONString(function (_key, value) {
        if (value === null || value === undefined || typeof value === 'object') return value;
        return value.toString().toUpperCase();
      });
    equal(actual, '["A","B","C"]');

    actual = Enumerable.from([1, 2, 3, 4, 5])
      .toJSONString(function (_key, value) { return value; }, 1);
    ok(actual.indexOf("\n") !== -1);
  });
});
test('toJSONString serializes an empty sequence as an empty array', () => {
  expect(Enumerable.empty<number>().toJSONString()).toBe('[]');
});

test('toJSONString accepts a property allowlist', () => {
  expect(Enumerable.make({ keep: 1, omit: 2 }).toJSONString(['keep'])).toBe('[{"keep":1}]');
});

import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Convert", () => {
  test("toArray", function () {
    const actual = Enumerable.range(1, 10).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
test('toArray returns a new array on every enumeration', () => {
  const sequence = Enumerable.from([1, 2]);
  const first = sequence.toArray();
  const second = sequence.toArray();

  expect(first).toEqual(second);
  expect(first).not.toBe(second);
});

test('toArray eagerly consumes deferred operations', () => {
  const action = vi.fn();

  const result = Enumerable.range(1, 2).doAction(action).toArray();

  expect(result).toEqual([1, 2]);
  expect(action).toHaveBeenCalledTimes(2);
});

import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("empty", function () {
    const actual = Enumerable.empty().toArray();
    deepEqual(actual, []);
  });
});
test('empty can be enumerated repeatedly', () => {
  const sequence = Enumerable.empty<number>();

  expect(sequence.toArray()).toEqual([]);
  expect(sequence.toArray()).toEqual([]);
});

test('empty does not invoke downstream selectors', () => {
  const selector = vi.fn((value: number) => value);

  expect(Enumerable.empty<number>().select(selector).toArray()).toEqual([]);
  expect(selector).not.toHaveBeenCalled();
});

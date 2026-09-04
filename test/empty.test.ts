import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("empty", function () {
    const actual = Enumerable.empty().toArray();
    expect(actual).toEqual([]);
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

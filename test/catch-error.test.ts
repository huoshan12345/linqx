import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ErrorHandling", () => {
  test("catchError", function () {
    let msg;
    const actual = Enumerable.range(1, 10)
      .select(function (i) {
        if (i === 5) throw new Error("aiueo");
        return i;
      })
      .catchError(function (e) {
        msg = e instanceof Error ? e.message : String(e);
      })
      .toArray();
    expect(actual).toEqual([1, 2, 3, 4]);
    expect(msg).toBe("aiueo");
  });
});
test('catchError passes through a sequence that does not fail', () => {
  const handler = vi.fn();

  expect(Enumerable.range(1, 3).catchError(handler).toArray()).toEqual([1, 2, 3]);
  expect(handler).not.toHaveBeenCalled();
});

test('catchError completes after handling the first source error', () => {
  const errors: unknown[] = [];
  const result = Enumerable.range(1, 5)
    .select(value => {
      if (value === 3) {
        throw new Error('failed');
      }
      return value;
    })
    .catchError(error => errors.push(error))
    .toArray();

  expect(result).toEqual([1, 2]);
  expect(errors).toHaveLength(1);
});

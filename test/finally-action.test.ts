import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, test } from './test-utils.js';

describe("ErrorHandling", () => {
  test("finallyAction", function () {
    let msg = "";
    const actual = Enumerable.range(1, 10)
      .select(function (i) {
        if (i === 5) throw new Error("aiueo");
        return i;
      })
      .catchError(function (e) {
        msg = e instanceof Error ? e.message : String(e);
      })
      .finallyAction(function () {
        msg += "f";
      })
      .toArray();
    deepEqual(actual, [1, 2, 3, 4]);
    equal(msg, "aiueof");
  });
});
test('finallyAction runs after normal completion', () => {
  const action = vi.fn();

  expect(Enumerable.range(1, 2).finallyAction(action).toArray()).toEqual([1, 2]);
  expect(action).toHaveBeenCalledOnce();
});

test('finallyAction runs when the consumer stops early', () => {
  const action = vi.fn();

  Enumerable.range(1, 5).finallyAction(action).take(1).force();

  expect(action).toHaveBeenCalledOnce();
});

import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, test } from './test-utils.js';

describe("Functional", () => {
  test("letBind", function () {
    const sum = Enumerable.range(1, 10)
      .letBind(function (e) {
        return e.zip(e, function (a, b) { return { a: a, b: b }; });
      })
      .select((value) => value.a + value.b)
      .sum();
    equal(sum, 110);

    const l1 = Enumerable.from([1, 2, 3, 4, 5]).letBind(function (a) {
      return Enumerable.from(a).zip(Enumerable.from(a).skip(1), function (x, y) {
        return x + ':' + y;
      });
    }).toArray();

    deepEqual(l1, ['1:2', '2:3', '3:4', '4:5']);

    const l2 = Enumerable.range(1, 5).letBind(function (a) {
      return Enumerable.from(a).zip(Enumerable.from(a).skip(1), function (x, y) {
        return x + ':' + y;
      });
    }).toArray();

    deepEqual(l2, ['1:2', '2:3', '3:4', '4:5']);

    deepEqual(l1, l2);
  });
});
test('letBind invokes its function once per enumeration', () => {
  const bind = vi.fn((source: Enumerable.IEnumerable<number>) => source.take(1));
  const sequence = Enumerable.range(1, 3).letBind(bind);

  expect(bind).not.toHaveBeenCalled();
  expect(sequence.toArray()).toEqual([1]);
  expect(sequence.toArray()).toEqual([1]);
  expect(bind).toHaveBeenCalledTimes(2);
});

test('letBind accepts array-like results', () => {
  expect(Enumerable.make(1).letBind(() => ({ 0: 'a', 1: 'b', length: 2 })).toArray())
    .toEqual(['a', 'b']);
});

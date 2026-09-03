import { describe } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2 } from './dictionary-fixture.js';
import Enumerable from './sut.js';
import { ok, test } from './test-utils.js';

describe("Set", () => {
  test("contains", function () {
    const numbers = Enumerable.range(1, 10);
    ok(numbers.contains(5));
    ok(!numbers.contains(13));
  });
});

describe('Dictionary', () => {
  test('contains', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add(obj1, 1);
    dictionary.add(obj1Copy, 2);

    ok(dictionary.contains('a'));
    ok(dictionary.contains('b'));
    ok(dictionary.contains(obj1));
    ok(dictionary.contains(obj1Copy));
    ok(!dictionary.contains('c'));
    ok(!dictionary.contains(obj2));

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);

    ok(comparedDictionary.contains(obj1));
    ok(comparedDictionary.contains(obj1Copy));
    ok(!comparedDictionary.contains({ a: 3 }));
  });
});
test('contains uses a comparison selector for structural keys', () => {
  const values = Enumerable.from([{ id: 1 }, { id: 2 }]);

  expect(values.contains({ id: 2 }, value => value.id)).toBe(true);
  expect(values.contains({ id: 3 }, value => value.id)).toBe(false);
});

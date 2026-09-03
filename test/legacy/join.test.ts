import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Join", () => {
  test("join", function ()
  {
      var math = { yamada: 100, tanaka: 80, yoshida: 94 };
      var english = { yamada: 73, yoshida: 26, tanaka: 99 };
      let actual: any = Enumerable.from(math)
          .join(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
              (o,i) => ({Name:o.key,Math:o.value,English:i.value}))
          .toArray();
      let expected: any = [{ Name: "yamada", Math: 100, English: 73 },
                      { Name: "tanaka", Math: 80, English: 99 },
                      { Name: "yoshida", Math: 94, English: 26}];
      deepEqual(actual, expected);
  
      actual = Enumerable.from(math)
          .join(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
              (o,i) => {return {Name:o.key, Math:o.value, English:i.value}})
          .toArray();
  
      expected = [{ Name: "yamada", Math: 100, English: 73 },
                  { Name: "tanaka", Math: 80, English: 99 },
                  { Name: "yoshida", Math: 94, English: 26}];
  
      deepEqual(actual, expected);
  
      actual = Enumerable.from(math)
          .join(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
              (o,i) => ({returnVal: o.key}))
          .toArray();
  
      expected = [{ returnVal: "yamada" }, { returnVal: "tanaka" }, { returnVal: "yoshida"}];
  
      deepEqual(actual, expected);
  });
});

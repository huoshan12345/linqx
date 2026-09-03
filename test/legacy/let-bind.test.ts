import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Functional", () => {
  test("letBind", function ()
  {
      var sum = Enumerable.range(1, 10)
          .letBind(function (e)
          {
              return e.zip(e, function (a, b) { return { a: a, b: b} });
          })
          .select((value) => value.a + value.b)
          .sum();
      equal(sum, 110);
  
      var l1 = Enumerable.from([1, 2, 3, 4, 5]).letBind(function (a) {
          return Enumerable.from(a).zip(Enumerable.from(a).skip(1), function (x, y) {
              return x + ':' + y;
          });
      }).toArray();
      
      deepEqual(l1, ['1:2', '2:3', '3:4', '4:5']);
  
      var l2 = Enumerable.range(1, 5).letBind(function (a) {
          return Enumerable.from(a).zip(Enumerable.from(a).skip(1), function (x, y) {
              return x + ':' + y;
          });
      }).toArray();
       
      deepEqual(l2, ['1:2', '2:3', '3:4', '4:5']);
  
      deepEqual(l1, l2);
  });
});

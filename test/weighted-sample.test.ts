import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Ordering", () => {
  var expected, actual;

  var list = [
      { a: 2, b: 4, c: 1 },
      { a: 2, b: 3, c: 7 },
      { a: 6, b: 6, c: 3 },
      { a: 4, b: 4, c: 5 },
      { a: 7, b: 3, c: 2 },
      { a: 4, b: 4, c: 3 }
  ];

  var strlist = [
      { a: "a", b: "z", c: "b" },
      { a: "z", b: "e", c: "e" },
      { a: "n", b: "d", c: "q" },
      { a: "a", b: "c", c: "k" },
      { a: "n", b: "d", c: "o" }
  ];

  test("weightedSample", function () {
      var result = Enumerable.from([1, 25, 35, 39]).weightedSample((value) => value)
          .take(10000)
          .groupBy((value) => value)
          .toObject((value) => value.key(), (value) => value.count());
  
      ok((function (x) { return 0 < x && x < 200 })(result[1]));
      ok((function (x) { return 2300 < x && x < 2700 })(result[25]));
      ok((function (x) { return 3300 < x && x < 3700 })(result[35]));
      ok((function (x) { return 3700 < x && x < 4100 })(result[39]));
  
      strictEqual(Enumerable.from(result).sum(function (x) { return x.value }), 10000);
  
      result = Enumerable.from([1, 99]).weightedSample((value) => value).take(10000).groupBy((value) => value).toObject((value) => value.key(), (value) => value.count());
      ok((function (x) { return 0 < x && x < 200 })(result[1]));
      ok((function (x) { return 9800 < x && x < 10000 })(result[99]));
  
      result = Enumerable.from([0, 1]).weightedSample((value) => value).take(10000).groupBy((value) => value).toObject((value) => value.key(), (value) => value.count());
      ok(result[0] === undefined);
      strictEqual(result[1], 10000);
  });
});

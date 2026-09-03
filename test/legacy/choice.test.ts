import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("choice", function () {
      let actual = Enumerable.choice(1, 10, 31, 42).take(10).toArray();
      notEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10], "random test. if failed retry");
      equal(actual.length, 10);
  
      actual = Enumerable.choice(...[1, 10, 31, 42]).take(10).toArray();
      notEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10], "random test. if failed retry");
      equal(actual.length, 10);
  
      var seq = Enumerable.make(1).concat([10]).concat([31]).concat([42]);
  
      actual = Enumerable.choice(...seq).take(10).toArray();
      notEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10], "random test. if failed retry");
      equal(actual.length, 10);
  });
});

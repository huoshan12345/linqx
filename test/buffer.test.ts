import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Grouping", () => {
  var fileList = ["temp.xls", "temp2.xls", "temp.pdf", "temp.jpg", "temp2.pdf", "temp3.xls"];

  test("buffer", function ()
  {
      let actual = Enumerable.range(1, 10).buffer(3).toArray();
      let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
      deepEqual(actual, expected);
  });
});

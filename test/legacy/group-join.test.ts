import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Join", () => {
  test("groupJoin", function ()
  {
      var array1 = [3, 3, 4, 5, 6];
      var array2 = [2, 4, 5, 6, 6];
      let actual = Enumerable.from(array1)
          .groupJoin(array2, (i) => i, (i) => i,
              function (outer, collection)
              {
                  return {
                      outer: outer,
                      collection: collection.toArray()
                  }
              })
          .toArray();
      let expected = [{ outer: 3, collection: [] },
                      { outer: 3, collection: [] },
                      { outer: 4, collection: [4] },
                      { outer: 5, collection: [5] },
                      { outer: 6, collection: [6, 6]}];
      deepEqual(actual, expected);
  
      actual = Enumerable.from(array1)
          .groupJoin(array2, (i) => i % 2 == 0, (i) => i % 2 == 0,
              function (outer, collection)
              {
                  return {
                      outer: outer,
                      collection: collection.toArray()
                  }
              })
          .toArray();
      expected = [{ outer: 3, collection: [5] },
                  { outer: 3, collection: [5] },
                  { outer: 4, collection: [2, 4, 6, 6] },
                  { outer: 5, collection: [5] },
                  { outer: 6, collection: [2, 4, 6, 6]}];
      deepEqual(actual, expected);
  });
});

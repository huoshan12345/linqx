import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Grouping", () => {
  const fileList = ["temp.xls", "temp2.xls", "temp.pdf", "temp.jpg", "temp2.pdf", "temp3.xls"];

  test("groupBy", function () {
    let actual: unknown = Enumerable.from(fileList)
      .groupBy((file) => file.match(/\.(.+$)/)![1])
      .select((value) => ({ key: value.key(), value: value.toArray() }))
      .toArray();
    let expected: unknown = [{ key: "xls", value: ["temp.xls", "temp2.xls", "temp3.xls"] },
    { key: "pdf", value: ["temp.pdf", "temp2.pdf"] },
    { key: "jpg", value: ["temp.jpg"] }];
    deepEqual(actual, expected);

    actual = Enumerable.from(fileList)
      .groupBy((file) => file.match(/\.(.+$)/)![1], (file) => file.match(/(^.+)\..+$/)![1])
      .select((value) => ({ key: value.key(), value: value.toArray() }))
      .toArray();
    expected = [{ key: "xls", value: ["temp", "temp2", "temp3"] },
    { key: "pdf", value: ["temp", "temp2"] },
    { key: "jpg", value: ["temp"] }];
    deepEqual(actual, expected);

    actual = Enumerable.from(fileList).groupBy((file) => file.match(/\.(.+$)/)![1],
      (file) => file,
      (ext, group) => ({ extension: ext, count: group.count(), files: group.toArray() }))
      .toArray();
    expected = [{ extension: "xls", count: 3, files: ["temp.xls", "temp2.xls", "temp3.xls"] },
    { extension: "pdf", count: 2, files: ["temp.pdf", "temp2.pdf"] },
    { extension: "jpg", count: 1, files: ["temp.jpg"] }];
    deepEqual(actual, expected);

    const objects = [
      { Date: new Date(2000, 1, 1), Id: 1 },
      { Date: new Date(2010, 5, 5), Id: 2 },
      { Date: new Date(2000, 1, 1), Id: 3 }
    ];
    actual = Enumerable.from(objects)
      .groupBy((value) => value.Date, (value) => value.Id,
        function (key, group) { return key.getFullYear() + "-" + group.toJoinedString(','); },
        function (key) { return key.toString(); })
      .toArray();
    expected = ["2000-1,3", "2010-2"];
    deepEqual(actual, expected);
  });
});
test('groupBy preserves first-key occurrence order', () => {
  expect(Enumerable.from(['b1', 'a1', 'b2']).groupBy(value => value[0]).map(group => group.key()))
    .toEqual(['b', 'a']);
});

test('groupBy returns no groups for an empty source', () => {
  expect(Enumerable.empty<number>().groupBy(value => value).toArray()).toEqual([]);
});

import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Grouping", () => {
  const fileList = ["temp.xls", "temp2.xls", "temp.pdf", "temp.jpg", "temp2.pdf", "temp3.xls"];

  test("partitionBy", function () {
    let actual: unknown = Enumerable.from(fileList)
      .partitionBy((file) => file.match(/\.(.+$)/)![1])
      .select((value) => ({ key: value.key(), value: value.toArray() }))
      .toArray();
    let expected: unknown = [{ key: "xls", value: ["temp.xls", "temp2.xls"] },
    { key: "pdf", value: ["temp.pdf"] },
    { key: "jpg", value: ["temp.jpg"] },
    { key: "pdf", value: ["temp2.pdf"] },
    { key: "xls", value: ["temp3.xls"] }
    ];
    deepEqual(actual, expected);

    actual = Enumerable.from(fileList)
      .partitionBy((file) => file.match(/\.(.+$)/)![1], (file) => file.match(/(^.+)\..+$/)![1])
      .select((value) => ({ key: value.key(), value: value.toArray() }))
      .toArray();
    expected = [{ key: "xls", value: ["temp", "temp2"] },
    { key: "pdf", value: ["temp"] },
    { key: "jpg", value: ["temp"] },
    { key: "pdf", value: ["temp2"] },
    { key: "xls", value: ["temp3"] }
    ];
    deepEqual(actual, expected);

    actual = Enumerable.from(fileList)
      .partitionBy((file) => file.match(/\.(.+$)/)![1],
        (file) => file,
        (ext, group) => ({ extension: ext, count: group.count(), files: group.toArray() }))
      .toArray();
    expected = [{ extension: "xls", count: 2, files: ["temp.xls", "temp2.xls"] },
    { extension: "pdf", count: 1, files: ["temp.pdf"] },
    { extension: "jpg", count: 1, files: ["temp.jpg"] },
    { extension: "pdf", count: 1, files: ["temp2.pdf"] },
    { extension: "xls", count: 1, files: ["temp3.xls"] }
    ];
    deepEqual(actual, expected);

    const objects = [
      { Date: new Date(2000, 1, 1), Id: 1 },
      { Date: new Date(2000, 1, 1), Id: 2 },
      { Date: new Date(2010, 5, 5), Id: 3 },
      { Date: new Date(2000, 1, 1), Id: 4 },
      { Date: new Date(2010, 5, 5), Id: 5 },
      { Date: new Date(2010, 5, 5), Id: 6 }
    ];
    actual = Enumerable.from(objects)
      .partitionBy((value) => value.Date, (value) => value.Id,
        function (key, group) { return key.getFullYear() + "-" + group.toJoinedString(','); },
        function (key) { return key.toString(); })
      .toArray();
    expected = ["2000-1,2", "2010-3", "2000-4", "2010-5,6"];
    deepEqual(actual, expected);
  });
});
test('partitionBy separates equal keys that are not adjacent', () => {
  const groups = Enumerable.from([1, 1, 2, 1])
    .partitionBy(value => value)
    .map(group => ({ key: group.key(), values: group.toArray() }));

  expect(groups).toEqual([
    { key: 1, values: [1, 1] },
    { key: 2, values: [2] },
    { key: 1, values: [1] },
  ]);
});

test('partitionBy returns no groups for an empty sequence', () => {
  expect(Enumerable.empty<number>().partitionBy(value => value).toArray()).toEqual([]);
});

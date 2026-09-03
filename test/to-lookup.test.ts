import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, ok, test } from './test-utils.js';

describe("Convert", () => {
  test("toLookup", function () {
    let fileList = ["temp.xls", "temp2.xls", "temp.pdf", "temp.jpg", "temp2.pdf"];
    let actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1]);

    deepEqual(["temp.xls", "temp2.xls"], actual.get("xls").toArray());
    deepEqual(["temp.pdf", "temp2.pdf"], actual.get("pdf").toArray());
    deepEqual(["temp.jpg"], actual.get("jpg").toArray());
    equal(3, actual.count());
    ok(actual.contains("xls"));
    ok(!actual.contains("XLS"));
    const array = actual.toEnumerable().toArray();
    equal("xls", array[0].key());
    deepEqual(["temp.xls", "temp2.xls"], array[0].toArray());

    actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1], (file) => file + 'ele');
    deepEqual(["temp.xlsele", "temp2.xlsele"], actual.get("xls").toArray());
    deepEqual(["temp.pdfele", "temp2.pdfele"], actual.get("pdf").toArray());
    deepEqual(["temp.jpgele"], actual.get("jpg").toArray());

    fileList = ["temp.xls", "temp2.XLS", "temp.pdf", "temp.jpg", "temp2.pDf"];
    actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1], (file) => file + 'ele',
      function (s) { return s.toLowerCase(); });
    deepEqual(actual.get("xLS").toArray(), ["temp.xlsele", "temp2.XLSele"]);
    deepEqual(actual.get("PDf").toArray(), ["temp.pdfele", "temp2.pDfele"]);
    deepEqual(actual.get("Jpg").toArray(), ["temp.jpgele"]);
    ok(actual.contains("xls"));
    ok(actual.contains("XLS"));
  });
});
test('toLookup returns an empty group for a missing key', () => {
  const lookup = Enumerable.from(['a']).toLookup(value => value);

  expect(lookup.get('missing').toArray()).toEqual([]);
  expect(lookup.contains('missing')).toBe(false);
});

test('toLookup stores projected values under normalized keys', () => {
  const lookup = Enumerable.from(['A', 'a'])
    .toLookup(value => value, value => value.charCodeAt(0), key => key.toLowerCase());

  expect(lookup.count()).toBe(1);
  expect(lookup.get('A').toArray()).toEqual([65, 97]);
});

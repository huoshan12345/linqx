import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Convert", () => {
  test("toLookup", function () {
    let fileList = ["temp.xls", "temp2.xls", "temp.pdf", "temp.jpg", "temp2.pdf"];
    let actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1]);

    expect(["temp.xls", "temp2.xls"]).toEqual(actual.get("xls").toArray());
    expect(["temp.pdf", "temp2.pdf"]).toEqual(actual.get("pdf").toArray());
    expect(["temp.jpg"]).toEqual(actual.get("jpg").toArray());
    expect(3).toBe(actual.count());
    expect(actual.contains("xls")).toBe(true);
    expect(actual.contains("XLS")).toBe(false);
    const array = actual.toEnumerable().toArray();
    expect("xls").toBe(array[0].key());
    expect(["temp.xls", "temp2.xls"]).toEqual(array[0].toArray());

    actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1], (file) => file + 'ele');
    expect(["temp.xlsele", "temp2.xlsele"]).toEqual(actual.get("xls").toArray());
    expect(["temp.pdfele", "temp2.pdfele"]).toEqual(actual.get("pdf").toArray());
    expect(["temp.jpgele"]).toEqual(actual.get("jpg").toArray());

    fileList = ["temp.xls", "temp2.XLS", "temp.pdf", "temp.jpg", "temp2.pDf"];
    actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1], (file) => file + 'ele',
      function (s) { return s.toLowerCase(); });
    expect(actual.get("xLS").toArray()).toEqual(["temp.xlsele", "temp2.XLSele"]);
    expect(actual.get("PDf").toArray()).toEqual(["temp.pdfele", "temp2.pDfele"]);
    expect(actual.get("Jpg").toArray()).toEqual(["temp.jpgele"]);
    expect(actual.contains("xls")).toBe(true);
    expect(actual.contains("XLS")).toBe(true);
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

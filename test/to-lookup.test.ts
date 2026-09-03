import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Convert", () => {
  test("toLookup", function ()
  {
      var fileList = ["temp.xls", "temp2.xls", "temp.pdf", "temp.jpg", "temp2.pdf"];
      let actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1]);
  
      deepEqual(["temp.xls", "temp2.xls"], actual.get("xls").toArray());
      deepEqual(["temp.pdf", "temp2.pdf"], actual.get("pdf").toArray());
      deepEqual(["temp.jpg"], actual.get("jpg").toArray());
      equal(3, actual.count());
      ok(actual.contains("xls"));
      ok(!actual.contains("XLS"));
      var array = actual.toEnumerable().toArray();
      equal("xls", array[0].key());
      deepEqual(["temp.xls", "temp2.xls"], array[0].toArray());
  
      actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1], (file) => file +'ele');
      deepEqual(["temp.xlsele", "temp2.xlsele"], actual.get("xls").toArray());
      deepEqual(["temp.pdfele", "temp2.pdfele"], actual.get("pdf").toArray());
      deepEqual(["temp.jpgele"], actual.get("jpg").toArray());
  
      fileList = ["temp.xls", "temp2.XLS", "temp.pdf", "temp.jpg", "temp2.pDf"];
      actual = Enumerable.from(fileList).toLookup((file) => file.match(/\.(.+$)/)![1], (file) => file +'ele',
          function (s) { return s.toLowerCase() });
      deepEqual(actual.get("xLS").toArray(), ["temp.xlsele", "temp2.XLSele"]);
      deepEqual(actual.get("PDf").toArray(), ["temp.pdfele", "temp2.pDfele"]);
      deepEqual(actual.get("Jpg").toArray(), ["temp.jpgele"]);
      ok(actual.contains("xls"));
      ok(actual.contains("XLS"));
  });
});

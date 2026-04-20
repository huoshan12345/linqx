import { Enumerable } from "./linq.js";

declare module './linq.js' {
  type IEnumerable<T> = Enumerable.IEnumerable<T>;

  namespace Enumerable {
    export interface IPageInfo {
      pageNumber: number;
      pageSize: number;
    }

    export interface IndexedItem<T> {
      index: number;
      item: T;
    }

    export interface PositionedItem<T> extends IndexedItem<T> {
      isFirst: boolean;
      isLast: boolean;
    }

    export interface ItemWithNeighbors<T> {
      prev: T | null;
      item: T;
      next: T | null;
    }

    export const prototype: any;

    interface IEnumerable<T> {
      whereIf(flag: boolean | string | undefined | null, filter: (t: T) => boolean): IEnumerable<T>;
      page(pageNumber: number, pageSize: number): IEnumerable<T>;
      page(info: IPageInfo): IEnumerable<T>;
      joinWith(separator: string): string; // join is a built-in method, so just name it joinWith.
      joinWith<T>(this: IEnumerable<T>, separator: (t: T) => T): IEnumerable<T>;
      toMap<K, V>(keySelector: (element: T) => K, valueSelector: (element: T) => V): Map<K, V>;
      chunk(size: number): IEnumerable<T[]>;
      index(): IEnumerable<IndexedItem<T>>;
      position(): IEnumerable<PositionedItem<T>>;
      withNeighbors(): IEnumerable<ItemWithNeighbors<T>>;
    }
  }
}

type IEnumerable<T> = Enumerable.IEnumerable<T>;
type IPageInfo = Enumerable.IPageInfo;
type IndexedItem<T> = Enumerable.IndexedItem<T>;
type PositionedItem<T> = Enumerable.PositionedItem<T>;
type ItemWithNeighbors<T> = Enumerable.ItemWithNeighbors<T>;

Enumerable.prototype.whereIf = function <T>(this: IEnumerable<T>, flag: boolean | string, filter: (t: T) => boolean): IEnumerable<T> {
  return flag ? this.where(filter) : this;
};

function page<T>(this: IEnumerable<T>, pageInfo: IPageInfo): IEnumerable<T>;
function page<T>(this: IEnumerable<T>, pageNumber: number, pageSize: number): IEnumerable<T>;
function page<T>(this: IEnumerable<T>, ...args: any[]): IEnumerable<T> {
  let number = 0;
  let size = 0;
  if (args.length === 1) {
    const info = args[0] as IPageInfo;
    number = info.pageNumber;
    size = info.pageSize;
  } else {
    number = args[0] as number;
    size = args[1] as number;
  }
  return this.skip((number - 1) * size).take(size);
}
Enumerable.prototype.page = page;

Enumerable.prototype.map = function <T, TResult>(this: IEnumerable<T>, selector: (element: T, index: number) => TResult): TResult[] {
  return this.select(selector).toArray();
};

function joinWith<T>(this: IEnumerable<T>, separator: string): string;
function joinWith<T>(this: IEnumerable<T>, separator: (t: T) => T): IEnumerable<T>;
function joinWith<T>(this: IEnumerable<T>, separator: string | ((t: T) => T)): string | IEnumerable<T> {
  if (typeof separator === 'string') {
    return this.toArray().join(separator);
  }

  return Enumerable.from(joinWithIterator(this, separator));

  function* joinWithIterator(enumerable: IEnumerable<T>, sep: (t: T) => T): Iterable<T> {
    for (const { index, item, isFirst, isLast } of enumerable.position()) {
      yield item;
      if (!isLast) {
        yield sep(item);
      }
    }
  }

}

Enumerable.prototype.joinWith = joinWith;

Enumerable.prototype.toMap = function <T, K, V>(this: IEnumerable<T>, keySelector: (element: T) => K, valueSelector: (element: T) => V) {
  const map = new Map<K, V>();
  for (const m of this) {
    const k = keySelector(m);
    const v = valueSelector(m);
    map.set(k, v);
  }
  return map;
};

function* chunkIterator<T>(enumerable: IEnumerable<T>, size: number) {
  const e = enumerable.getEnumerator();

  // Before allocating anything, make sure there's at least one element.
  if (e.moveNext()) {
    // Now that we know we have at least one item, allocate an initial storage array. This is not
    // the array we'll yield.  It starts out small in order to avoid significantly overallocating
    // when the source has many fewer elements than the chunk size.
    let arraySize = Math.min(size, 4);
    let i: number;
    do {
      const array = new Array<T>(arraySize);

      // Store the first item.
      array[0] = e.current();
      i = 1;

      if (size != array.length) {
        // This is the first chunk. As we fill the array, grow it as needed.
        for (; i < size && e.moveNext(); i++) {
          if (i >= array.length) {
            arraySize = Math.min(size, 2 * array.length);
            resize(array, arraySize);
          }

          array[i] = e.current();
        }
      }
      else {
        // For all but the first chunk, the array will already be correctly sized.
        // We can just store into it until either it's full or MoveNext returns false.
        const local = array; // avoid bounds checks by using cached local (`array` is lifted to iterator object as a field)
        for (; i < local.length && e.moveNext(); i++) {
          local[i] = e.current();
        }
      }

      if (i != array.length) {
        resize(array, i);
      }

      yield array;
    }
    while (i >= size && e.moveNext());
  }
}

Enumerable.prototype.chunk = function <T>(this: IEnumerable<T>, size: number): IEnumerable<T[]> {
  if (size < 1)
    throw new Error('size cannot be less than 1');

  const e = chunkIterator<T>(this, size);
  return Enumerable.from(e);
};

function* positionIterator<T>(enumerable: IEnumerable<T>) {
  const e = enumerable.getEnumerator();

  if (!e.moveNext()) {
    return;
  }

  let i = 0;
  let current = e.current();
  while (e.moveNext()) {
    yield {
      index: i,
      item: current,
      isFirst: i === 0,
      isLast: false
    };

    current = e.current();
    ++i;
  }

  yield {
    index: i,
    item: current,
    isFirst: i === 0,
    isLast: true
  };
}

Enumerable.prototype.position = function <T>(this: IEnumerable<T>): IEnumerable<PositionedItem<T>> {
  const e = positionIterator<T>(this);
  return Enumerable.from(e);
};

Enumerable.prototype.index = function <T>(this: IEnumerable<T>): IEnumerable<IndexedItem<T>> {
  const e = positionIterator<T>(this);
  return this.select((m, i) => ({ index: i, item: m }) as IndexedItem<T>);
};

function* withNeighborsIterator<T>(enumerable: IEnumerable<T>): Iterable<ItemWithNeighbors<T>> {
  const e = enumerable.getEnumerator();
  if (!e.moveNext()) {
    return;
  }

  let previous: T | null = null;
  let current: T = e.current();
  while (e.moveNext()) {
    const next: T = e.current();
    yield { prev: previous, item: current, next: next };
    previous = current;
    current = next;
  }

  yield { prev: previous, item: current, next: null };
}

Enumerable.prototype.withNeighbors = function <T>(this: IEnumerable<T>): IEnumerable<ItemWithNeighbors<T>> {
  const e = withNeighborsIterator<T>(this);
  return Enumerable.from(e);
};

function resize<T>(array: T[], newSize: number): void {
  const oldSize = array.length;

  if (newSize > oldSize) {
    array.length = newSize;
    array.fill(undefined as T, oldSize, newSize);
  } else if (newSize < oldSize) {
    array.length = newSize;
  }
};
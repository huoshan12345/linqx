"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linq_js_1 = require("./linq.js");
// NOTE: 这里不能用defineFunction，虽然在dev下没问题，在build之后会找不到方法
linq_js_1.Enumerable.prototype.whereIf = function (flag, filter) {
    return flag ? this.where(filter) : this;
};
function page(...args) {
    let number = 0;
    let size = 0;
    if (args.length === 1) {
        const info = args[0];
        number = info.pageNumber;
        size = info.pageSize;
    }
    else {
        number = args[0];
        size = args[1];
    }
    return this.skip((number - 1) * size).take(size);
}
linq_js_1.Enumerable.prototype.page = page;
linq_js_1.Enumerable.prototype.map = function (selector) {
    return this.select(selector).toArray();
};
function joinWith(separator) {
    if (typeof separator === 'string') {
        return this.toArray().join(separator);
    }
    return linq_js_1.Enumerable.from(joinWithIterator(this, separator));
    function* joinWithIterator(enumerable, sep) {
        for (const { index, item, isFirst, isLast } of enumerable.position()) {
            yield item;
            if (!isLast) {
                yield sep(item);
            }
        }
    }
}
linq_js_1.Enumerable.prototype.joinWith = joinWith;
linq_js_1.Enumerable.prototype.toMap = function (keySelector, valueSelector) {
    const map = new Map();
    for (const m of this) {
        const k = keySelector(m);
        const v = valueSelector(m);
        map.set(k, v);
    }
    return map;
};
function* chunkIterator(enumerable, size) {
    const e = enumerable.getEnumerator();
    // Before allocating anything, make sure there's at least one element.
    if (e.moveNext()) {
        // Now that we know we have at least one item, allocate an initial storage array. This is not
        // the array we'll yield.  It starts out small in order to avoid significantly overallocating
        // when the source has many fewer elements than the chunk size.
        let arraySize = Math.min(size, 4);
        let i;
        do {
            const array = new Array(arraySize);
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
        } while (i >= size && e.moveNext());
    }
}
linq_js_1.Enumerable.prototype.chunk = function (size) {
    if (size < 1)
        throw new Error('size cannot be less than 1');
    const e = chunkIterator(this, size);
    return linq_js_1.Enumerable.from(e);
};
function* positionIterator(enumerable) {
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
linq_js_1.Enumerable.prototype.position = function () {
    const e = positionIterator(this);
    return linq_js_1.Enumerable.from(e);
};
linq_js_1.Enumerable.prototype.index = function () {
    const e = positionIterator(this);
    return this.select((m, i) => ({ index: i, item: m }));
};
function* withNeighborsIterator(enumerable) {
    const e = enumerable.getEnumerator();
    if (!e.moveNext()) {
        return;
    }
    let previous = null;
    let current = e.current();
    while (e.moveNext()) {
        const next = e.current();
        yield { prev: previous, item: current, next: next };
        previous = current;
        current = next;
    }
    yield { prev: previous, item: current, next: null };
}
linq_js_1.Enumerable.prototype.withNeighbors = function () {
    const e = withNeighborsIterator(this);
    return linq_js_1.Enumerable.from(e);
};
function resize(array, newSize) {
    const oldSize = array.length;
    if (newSize > oldSize) {
        array.length = newSize;
        array.fill(undefined, oldSize, newSize);
    }
    else if (newSize < oldSize) {
        array.length = newSize;
    }
}
;

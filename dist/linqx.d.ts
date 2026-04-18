declare module './linq.js' {
    type IEnumerable<T> = Enumerable.IEnumerable<T>;
    namespace Enumerable {
        interface IPageInfo {
            pageNumber: number;
            pageSize: number;
        }
        interface IndexedItem<T> {
            index: number;
            item: T;
        }
        interface PositionedItem<T> extends IndexedItem<T> {
            isFirst: boolean;
            isLast: boolean;
        }
        interface ItemWithNeighbors<T> {
            prev: T | null;
            item: T;
            next: T | null;
        }
        const prototype: any;
        interface IEnumerable<T> {
            whereIf(flag: boolean | string | undefined | null, filter: (t: T) => boolean): IEnumerable<T>;
            page(pageNumber: number, pageSize: number): IEnumerable<T>;
            page(info: IPageInfo): IEnumerable<T>;
            joinWith(separator: string): string;
            joinWith<T>(this: IEnumerable<T>, separator: (t: T) => T): IEnumerable<T>;
            toMap<K, V>(keySelector: (element: T) => K, valueSelector: (element: T) => V): Map<K, V>;
            chunk(size: number): IEnumerable<T[]>;
            index(): IEnumerable<IndexedItem<T>>;
            position(): IEnumerable<PositionedItem<T>>;
            withNeighbors(): IEnumerable<ItemWithNeighbors<T>>;
        }
    }
}
export {};

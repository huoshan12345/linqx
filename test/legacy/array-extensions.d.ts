declare global {
  interface Array<T> {
    alternate(separator: unknown): any;
    asEnumerable(): any;
    distinctUntilChanged(compareSelector?: unknown): any;
    isEmpty(): boolean;
    merge(...others: unknown[]): any;
    select(selector: unknown): any;
    zip(...args: unknown[]): any;
  }
}

export {};

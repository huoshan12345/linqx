import type { IEnumerator } from '../types.js';

export class Enumerator<T> implements IEnumerator<T> {
  private value!: T;
  private done = false;

  constructor(private readonly iterator: Iterator<T>) {}

  current(): T {
    return this.value;
  }

  moveNext(): boolean {
    if (this.done) {
      return false;
    }

    const result = this.iterator.next();
    this.done = Boolean(result.done);

    if (!this.done) {
      this.value = result.value;
    }

    return !this.done;
  }

  dispose(): void {
    this.done = true;
    this.iterator.return?.();
  }
}

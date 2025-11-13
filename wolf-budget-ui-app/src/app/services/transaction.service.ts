import { Injectable, signal } from '@angular/core';

export interface Transaction {
  id: number;
  transactionName: string;
}

@Injectable()
export class TransactionService {
  private nextId = 1;

  // signal holding the array of data
  private readonly _transactions = signal<Transaction[]>([]);

  // read-only view exposed to components
  readonly transactions = this._transactions.asReadonly();

  // logic for adding a new item
  add(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    const tx: Transaction = {
      id: this.nextId++,
      transactionName: trimmed,
    };

    this._transactions.update(list => [...list, tx]);
  }
}

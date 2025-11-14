import { Injectable, signal } from '@angular/core';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  // signal-backed list of transactions
  private readonly _transactions = signal<Transaction[]>([
    { id: 1, name: 'Rent', amount: -1200 },
    { id: 2, name: 'Groceries', amount: -300 },
    { id: 3, name: 'Paycheck', amount: 2500 },
  ]);

  // expose as read-only to components
  readonly transactions = this._transactions.asReadonly();

  private readonly _nextId = signal(4);

  addTransaction(name: string, amount: number): void {
    const trimmedName = name.trim();
    if (!trimmedName || Number.isNaN(amount)) {
      return;
    }

    const id = this._nextId();
    this._transactions.update(list => [
      ...list,
      { id, name: trimmedName, amount },
    ]);
    this._nextId.update(v => v + 1);
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private readonly http: HttpClient) {}

  // signal-backed list of transactions (from your earlier homework)
  private readonly _transactions = signal<Transaction[]>([
    { id: 1, name: 'Rent', amount: -1200 },
    { id: 2, name: 'Groceries', amount: -300 },
    { id: 3, name: 'Paycheck', amount: 2500 },
  ]);

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

  // NEW: fetch data from public API
  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('https://jsonplaceholder.typicode.com/users');
  }
}

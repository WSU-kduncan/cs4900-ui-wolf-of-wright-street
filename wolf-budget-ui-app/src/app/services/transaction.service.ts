import { signal, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);

  // Transactions list (currently hard-coded)
    transactions = signal<{id: number, name: string}[]>(
  [
    {id: 1, name: "Grocery shopping"},
    {id: 2, name: "Amazon purchase"},
    {id: 3, name: "Loan payment"},
    {id: 4, name: "Taxes"},
    {id: 5, name: "Christmas presents"}
  ]);

  // Create a new transaction
  createTransaction(id: number, name: string) {
    this.transactions.set([...this.transactions(), {id, name}])
  }

  constructor() { }
}

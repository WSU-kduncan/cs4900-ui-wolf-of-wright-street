import { signal, Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  transactions = signal<Transaction[]>([]);

  constructor() { 
    this.loadTransactions();
  }

  refresh() {
    this.loadTransactions();
  }

  // LOADS transactions from a link.
  private loadTransactions() {
    this.http.get<Transaction[]>('http://localhost:8080/Wolf_of_Wright_Street_Service/transactions')
      .subscribe(data => { this.transactions.set(data)});
  }

  // GET Transactions from a link (the API)
  getTransactions(): Observable<Transaction[]> {
    const link = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';
    return this.http.get<Transaction[]>(link);
  }

  // POST: Add a new transaction
  createTransaction(newTransaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>('http://localhost:8080/Wolf_of_Wright_Street_Service/transactions', newTransaction)
    .pipe(tap(() => this.refresh()));
  }

  // DELETE: Remove a transaction by transaction id
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`)
    .pipe(tap(() => this.refresh()));
  }
}

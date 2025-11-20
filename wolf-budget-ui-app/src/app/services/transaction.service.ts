import { signal, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  transactions = this.getTransactions();

  constructor() { }

  // GET Transactions from a link (the API)
  getTransactions(): Observable<Transaction[]> {
    const link = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';
    return this.http.get<Transaction[]>(link);
  }

  // POST: Add a new transaction
  createTransaction(newTransaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>('http://localhost:8080/Wolf_of_Wright_Street_Service/transactions', newTransaction);
  }
}

import { signal, Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions = signal<{ id: number; transactionName: string }[]>([
    { id: 1, transactionName: 'Transaction One' },
    { id: 2, transactionName: 'Transaction Two' },
    { id: 3, transactionName: 'Transaction Three' },
    { id: 4, transactionName: 'Transaction Four' }
  ]);

  createTransaction(newTransaction: Transaction) {
    this.transactions.set([...this.transactions(), newTransaction]);
  }

  getTransactions(): Observable<Transaction[]> {
  const url = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';
  return this.http.get<Transaction[]>(url);
  }


  // add HTTP client object
  constructor(private http: HttpClient) { }
}

import { signal, Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions = signal<Transaction[]>([]); // empty now since want to call from DB

  createTransaction(newTransaction: Transaction): Observable<Transaction> {
    console.log('called create inside service');
    this.transactions.update(trans => [...trans, newTransaction]);
    console.log('past update');
    // post to back end
    return this.http.post<Transaction>(
    'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions',
    newTransaction
    );
  }

  getTransactions(): Observable<Transaction[]> {
    const url = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';
    return this.http.get<Transaction[]>(url);
  }

  private loadTransactions() {
    const url = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';
    this.http.get<Transaction[]>(url).subscribe(data => {
      this.transactions.set(data);
    });
  }

  getTransactionById(id: number | string): Observable<Transaction> {
    const url = `http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`;
    return this.http.get<Transaction>(url);
  }

  //update
  updateTransaction(id: number, changeTransaction: Transaction): Observable<Transaction> {
    const url = `http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`;
    
    
    this.transactions.update(trans => 
      trans.map(transaction => (transaction.id === id ? { ...transaction, ...changeTransaction } : transaction))
    );

    return this.http.put<Transaction>(url, changeTransaction);
  }

  deleteTransaction(id: number): Observable<void> {
     const url = `http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`;
    return this.http.delete<void>(url);
  }

  // add HTTP client object
  constructor(private http: HttpClient) { 
    this.loadTransactions();
  }
}

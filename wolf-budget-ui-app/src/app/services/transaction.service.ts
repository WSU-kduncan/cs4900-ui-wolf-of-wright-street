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


  // add HTTP client object
  constructor(private http: HttpClient) { 
    this.loadTransactions();
  }
}

import { signal, Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions = signal<Transaction[]>([]); // empty now since want to call from DB

  createTransaction(newTransaction: Transaction) {
    this.transactions.set([...this.transactions(), newTransaction]);
  }

  getTransactions(): Observable<Transaction[]> {
    const url = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';

    return this.http.get<Transaction[]>(url).pipe(
      tap((data: Transaction[]) => {
        // Update the signal when the HTTP call succeeds
        this.transactions.set(data);
        console.log('Fetched transactions:', data);
      })
    );
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

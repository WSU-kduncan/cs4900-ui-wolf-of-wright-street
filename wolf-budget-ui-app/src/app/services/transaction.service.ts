import { signal, Injectable, inject, WritableSignal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction} from '../models/transaction.model'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  //transactionsSignal = signal<Transaction[]>([]);
  //transactions = this.transactionsSignal.asReadonly();
  transactions: WritableSignal<Transaction[]> = signal([]);

  constructor() { 
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
    .pipe(tap((created: Transaction) => {
      // Add new transaction to the signal immediately
      this.transactions.update(trans => [...trans, created]);
    })
  );
}
  

  // DELETE: Remove a transaction by transaction id
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`)
    .pipe(tap(() => {
        this.transactions.update((trans: Transaction[]) =>
          trans.filter((t: Transaction) => t.id !== id)
        );
      })
    );
  }

    getTransactionById(id: number | string): Observable<Transaction> {
    const url = `http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`;
    return this.http.get<Transaction>(url);
  }
    updateTransaction(id: number, changeTransaction: Transaction): Observable<Transaction> {
    const url = `http://localhost:8080/Wolf_of_Wright_Street_Service/transactions/${id}`;
    
    
    this.transactions.update(trans => 
      trans.map(transaction => (transaction.id === id ? { ...transaction, ...changeTransaction } : transaction))
    );

    return this.http.put<Transaction>(url, changeTransaction);
  }

}

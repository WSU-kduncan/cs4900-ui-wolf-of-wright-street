import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';

  transactions = signal<Transaction[]>([]);

  constructor() {
    this.refresh();
  }

  // GET and set signal
  refresh() {
    this.http.get<Transaction[]>(this.baseUrl)
      .subscribe(data => this.transactions.set(data));
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  createTransaction(body: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, body)
      .pipe(tap(() => this.refresh()));
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.refresh()));
  }

  updateTransaction(id: number, body: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${id}`, body)
      .pipe(tap(() => this.refresh()));
  }
}

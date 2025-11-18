import { HttpClient } from '@angular/common/http'
import { signal, Injectable, inject } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class InsertTransactionService {
  private http = inject(HttpClient);

  getTransactions(): Observable<Transaction[]> {
    const url = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transactions';
    return this.http.get<Transaction[]>(url);
  }

  constructor() { }
}
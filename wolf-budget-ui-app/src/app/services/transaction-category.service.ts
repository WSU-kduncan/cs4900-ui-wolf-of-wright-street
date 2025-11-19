import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionCategory } from '../models/transactioncategory.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionCategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<TransactionCategory[]> {
    const url = 'http://localhost:8080/Wolf_of_Wright_Street_Service/transaction_category';
    return this.http.get<TransactionCategory[]>(url);
  }
}

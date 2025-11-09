import { signal, Injectable } from '@angular/core';

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

  constructor() { }
}

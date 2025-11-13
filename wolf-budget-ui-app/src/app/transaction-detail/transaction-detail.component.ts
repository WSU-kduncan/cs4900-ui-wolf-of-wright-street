import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Transaction } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>{{ item().transactionName }}</h3>
    <p>id: {{ item().id }}</p>
  `,
})
export class TransactionDetailComponent {
  // required signal input() that accepts a Transaction
  readonly item = input.required<Transaction>();
}

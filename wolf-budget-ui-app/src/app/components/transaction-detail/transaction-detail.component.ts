import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
})
export class TransactionDetailComponent {
  // required signal input from parent
  transaction = input.required<Transaction>();
}

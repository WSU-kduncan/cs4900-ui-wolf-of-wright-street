import { Component, Input, signal } from '@angular/core';

interface Transaction {
  id: number;
  userEmail: string;
  categoryName: string;
  transactionDateTime: string;
  description?: string;
  amount: number;
}

@Component({
  selector: 'app-transaction',
  imports: [],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  @Input({required: true}) transaction: Transaction | null = null;
}

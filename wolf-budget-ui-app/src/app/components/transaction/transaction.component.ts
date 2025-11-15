import { Component, Input, signal } from '@angular/core';

interface Transaction {
  id: number, 
  transactionName: string
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

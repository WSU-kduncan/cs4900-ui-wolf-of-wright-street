import { Component, Input, signal } from '@angular/core';

interface Transaction {
  id: number;
  transactionName: string;
}

@Component({
  selector: 'app-transaction-detail',
  imports: [],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
  standalone: true
})
export class TransactionDetailComponent {
  @Input({required: true})  transaction: Transaction | null = null;

  

  
}

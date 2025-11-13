import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [CommonModule, TransactionDetailComponent],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
})
export class EditTransactionComponent {
  private readonly transactionService = inject(TransactionService);

  // use the service's signal in the list component
  readonly transactions = this.transactionService.transactions;

  // signal to hold the current text input
  readonly newName = signal('');

  onNameInput(value: string): void {
    this.newName.set(value);
  }

  addTransaction(): void {
    this.transactionService.add(this.newName());
    this.newName.set('');
  }
}

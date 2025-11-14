import { Component, inject, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [TransactionDetailComponent],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
})
export class EditTransactionComponent {
  title = 'Edit Transaction';

  private readonly transactionService = inject(TransactionService);

  readonly transactions = this.transactionService.transactions;

  newName = signal<string>('');
  newAmount = signal<number | null>(null);

  onNameInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.newName.set(target?.value ?? '');
  }

  onAmountInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.newAmount.set(target ? target.valueAsNumber : null);
  }

  addFromForm(): void {
    const name = this.newName().trim();
    const amount = this.newAmount();

    if (!name || amount === null || Number.isNaN(amount)) {
      return;
    }

    this.transactionService.addTransaction(name, amount);
    this.newName.set('');
    this.newAmount.set(null);
  }
}

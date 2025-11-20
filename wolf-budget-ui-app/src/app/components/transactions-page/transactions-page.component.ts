import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms'
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component'
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transactions-page',
  imports: [FormsModule, TransactionDetailComponent, TransactionFormComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
  standalone: true
})
export class TransactionsPageComponent {
  title = "Transactions Page"

  // inject TransactionService, grab transactions
  transactionService = inject(TransactionService);
  //transactionSignal = this.transactionService.transactions;

  // Input box Signal
  newTransactionSignal = signal('');

  // Get transactions using toSignal with API
  public transactions = toSignal(
    this.transactionService.getTransactions(), { initialValue: [] }
  );

  constructor() {
    this.transactionService.getTransactions().subscribe(data => {
    console.log("API returned:", data);
});
  }

  onDelete(id: number) {
  this.transactionService.deleteTransaction(id).subscribe();
}
}

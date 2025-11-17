import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms'
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component'

@Component({
  selector: 'app-transactions-page',
  imports: [FormsModule, TransactionDetailComponent],
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

  createTransaction() {
    // Grab the name from the textbox
    const name = this.newTransactionSignal();
    if (name == null) return;

    // REMOVED TEMPORARILY, to be replaced with an actual connection to API
    // Create transaction sent to service, clear signal
    //this.transactionService.createTransaction(Date.now(), name);
    //this.newTransactionSignal.set('');
  }

  constructor() {
    this.transactionService.getTransactions().subscribe(data => {
    console.log("API returned:", data);
});
  }
}

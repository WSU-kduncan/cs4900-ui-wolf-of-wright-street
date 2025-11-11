import { Component, inject, signal } from '@angular/core';
import { TransactionService } from "../../services/transaction.service";
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-transactions-page',
  imports: [FormsModule],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent {
  title = "Transactions Page"

  // inject TransactionService, grab transactions
  transactionService = inject(TransactionService);
  transactionSignal = this.transactionService.transactions;

  // Input box Signal
  newTransactionSignal = signal('');

  createTransaction() {
    // Grab the name from the textbox
    const name = this.newTransactionSignal();
    if (name == null) return;

    // Create transaction sent to service, clear signal
    this.transactionService.createTransaction(Date.now(), name);
    this.newTransactionSignal.set('');
  }
}

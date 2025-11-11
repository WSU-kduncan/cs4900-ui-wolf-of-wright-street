import { Component, inject } from '@angular/core';
import { TransactionService } from "../../services/transaction.service";

@Component({
  selector: 'app-transactions-page',
  imports: [],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent {
  title = "Transactions Page"

  // inject TransactionService, grab transactions
  transactionService = inject(TransactionService);
  transactionSignal = this.transactionService.transactions;
}

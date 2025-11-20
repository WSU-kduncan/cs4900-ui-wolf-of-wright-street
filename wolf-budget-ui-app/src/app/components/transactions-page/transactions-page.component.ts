import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms'
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component'
import { Router } from '@angular/router'; 


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

    router = inject(Router);

  // Get transactions
  public transactions = this.transactionService.transactions;

  constructor() {
    this.transactions = this.transactionService.transactions;
  }

  // DELETE transaction
  onDelete(id: number) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => console.log(`Deleted transaction ${id}`),
      error: err => console.error(err),
    });
  }

    onAdd() {
    // Navigate to form for creating a new transaction
    this.router.navigate(['/transactions/new']);
  }

  onEdit(id: number) {
    // Navigate to form for editing an existing transaction
    this.router.navigate(['/transactions', id]);
  }

  
}

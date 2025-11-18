import { Component, inject, signal, WritableSignal } from '@angular/core';
import { InsertTransactionService } from '../../services/insert-transaction.service';
import { Transaction } from '../../models/transaction.model';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from '../transaction/transaction.component'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-insert-transaction',
  imports: [FormsModule, TransactionComponent],
  templateUrl: './insert-transaction.component.html',
  styleUrl: './insert-transaction.component.scss'
})
export class InsertTransactionComponent {

  title = "Insert Transaction"

  // injects insert-transaction service
  service = inject(InsertTransactionService);

  transactionSignal = signal('')

  public transactions = toSignal(
    this.service.getTransactions(), { initialValue: []}
  );

  // function called upon insert transaction button pressed 
  insertTransaction() {
    const name = this.transactionSignal();
    if (!name) return;
  }

  constructor() {  }
  
}

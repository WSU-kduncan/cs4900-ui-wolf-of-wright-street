import { Component, inject, signal, WritableSignal } from '@angular/core';
import { InsertTransactionService } from '../../services/insert-transaction.service';
import { Transaction } from '../../models/transaction.model';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from '../transaction/transaction.component'

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

  // variable storing transaction signal from service 
  transactionSignal = this.service.transactions;

  // placeholder for user inputting new transaction 
  newSignal = signal('');

  // not exactly sure 
  currentTransaction: WritableSignal <Transaction | null> = signal(null);

  // function called upon insert transaction button pressed 
  insertTransaction() {

    // get new transaction name from input signal 
    const nameField = this.newSignal();

    if (!nameField) { return }
    
    const newTransactionObject: Transaction = {
      id: Date.now(),
      transactionName: nameField
    }

    this.service.insertTransaction(newTransactionObject)

    this.newSignal.set('')
  }

  
}

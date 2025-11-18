import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule} from '@angular/forms'; 
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { Transaction } from '../../models/transaction.model';
import { toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-transaction',
  imports: [FormsModule, TransactionDetailComponent],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
  standalone: true,
})
export class EditTransactionComponent {
  title = "Edit Transaction"

  // place transaction service inside this component
  tService = inject(TransactionService);

  //want signal from service from signal componet to interact with
  transactionSignal = this.tService.transactions;
  
  //form signals
  //newTransactionSignal = signal('');
  descriptionSignal = signal('');
  amountSignal = signal<number | null>(null);
  dateSignal = signal<string>(new Date().toISOString().substring(0, 10)); // default today
  categorySignal = signal<string>('Bills'); // default category
  cashflowTypeSignal = signal<string>('Expense'); // default cashflow type
  userEmailSignal = signal<string>('user@wolf.com');
  // keep track current transaction in signal array as we iterate
  currentTransaction: WritableSignal <Transaction | null> = signal(null);

  // runs when called, in our case add transaction clicked
  createTransaction() {
    console.log('called create');
    //get values from signals
    const description = this.descriptionSignal();
    const amount = this.amountSignal();
    const date = this.dateSignal();
    const categoryName = this.categorySignal();
    //const cashflowName = this.cashflowTypeSignal();
    const userEmail = this.userEmailSignal();

    if(!amount || !categoryName || !date === null) 
    {  
      console.log('triggered empty');
      return; // exit, nothing to add if null
    }
    // build object for insertion using interface
    // Build a new Transaction object
    const newTransactionObject: Transaction = {
      //id: Date.now(),
      userEmail: userEmail,
      categoryName: categoryName,
      transactionDateTime: new Date(date).toISOString(), // ensure ISO string
      description: description || '', // optional field
      amount: amount
    };
    // service to add transaction
    this.tService.createTransaction(newTransactionObject)
        .subscribe({
        next: (response) => {
    
          console.log('Transaction successful:', response);
        
        },
        error: (error) => {
         
          console.error('Transaction failed:', error);
         
        },
        complete: () => {
          
          console.log('Transaction handled');
        }
      });
    //two way bound signal in html, make sure to clear or value 
    // will stay same in input box
    this.descriptionSignal.set('');
    this.amountSignal.set(null);
    this.dateSignal.set(new Date().toISOString().substring(0, 10));
    this.categorySignal.set('Bills');
    this.cashflowTypeSignal.set('Expense');


  }
}

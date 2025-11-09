import { Component, inject, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-edit-transaction',
  imports: [FormsModule],
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

  //store name from inputBox into signal to grab value later
  newTransactionSignal = signal('');

  // runs when called, in our case add transaction clicked
  createTransaction() {
    //get new name from signal
    const nameField = this.newTransactionSignal();
    
    if(!nameField) return; // exit, nothing to add if null
    
    const newTransactionObject = {
      // unique number based on timestamp
      id: Date.now(),
      //name to take on value form newTransactionSignal
      transactionName: nameField
    };
    // service to add transaction
    this.tService.createTransaction(newTransactionObject);

    //two way bound signal in html, make sure to clear or value 
    // will stay same in input box
    this.newTransactionSignal.set('');
  }

  

 
}

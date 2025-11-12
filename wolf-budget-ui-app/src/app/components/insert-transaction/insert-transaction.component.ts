import { Component } from '@angular/core';

@Component({
  selector: 'app-insert-transaction',
  imports: [],
  templateUrl: './insert-transaction.component.html',
  styleUrl: './insert-transaction.component.scss'
})
export class InsertTransactionComponent {

  title = "Edit Transaction"
  
  transactions = [
    { id: 1, transactionName: 'Transaction One' },
    { id: 2, transactionName: 'Transaction Two' },
    { id: 3, transactionName: 'Transaction Three' },
    { id: 4, transactionName: 'Transaction Four' }
  ]; 
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-transaction',
  imports: [],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
  standalone: true,
})
export class EditTransactionComponent {
  title = "Edit Transaction"

  // transactions: { id: number; transactionName: string}[] = [];
  
  transactions = [
    { id: 1, transactionName: 'Transaction One' },
    { id: 2, transactionName: 'Transaction Two' },
    { id: 3, transactionName: 'Transaction Three' },
    { id: 4, transactionName: 'Transaction Four' }
  ]; 

 
}

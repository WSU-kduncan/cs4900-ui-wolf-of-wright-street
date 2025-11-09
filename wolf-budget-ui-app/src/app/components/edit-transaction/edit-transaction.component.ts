import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-edit-transaction',
  imports: [],
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

  

  

 
}

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule} from '@angular/forms'; 
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { Transaction } from '../../models/transaction.model';
import { toSignal} from '@angular/core/rxjs-interop';
import { Router } from '@angular/router'; 

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

  router = inject(Router);

  //want signal from service from signal componet to interact with
  transactionSignal = this.tService.transactions;

  isLoading = signal<boolean>(true);
  
  
  createTransaction() {
    // Navigate to form for creating a new transaction
    this.router.navigate(['/transactions/new']);
  }

  updateTransaction(id: number) {
    // Navigate to form for editing an existing transaction
    this.router.navigate(['/transactions', id]);
  }

  deleteTransaction(id: number){
  if (!id) {
    console.error('No transaction ID provided for deletion');
    return;
  }


  // delete
  this.tService.deleteTransaction(id).subscribe({
    next: () => {
      console.log(`Transaction ${id} deleted successfully`);
      // Optional: navigate or refresh list
      this.tService.transactions.update(list => list.filter(t => t.id !== id));
    },
    error: (err) => {
      console.error(`Failed to delete transaction ${id}`, err);
    }
  });
}

trackById(index: number, transaction: any) {
  return transaction.id;
}


  
}

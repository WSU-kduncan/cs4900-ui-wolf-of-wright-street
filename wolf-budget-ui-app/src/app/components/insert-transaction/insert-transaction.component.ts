import { Component, inject, signal, WritableSignal } from '@angular/core';
import { InsertTransactionService } from '../../services/insert-transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-insert-transaction',
  imports: [],
  templateUrl: './insert-transaction.component.html',
  styleUrl: './insert-transaction.component.scss'
})
export class InsertTransactionComponent {

  title = "Insert Transaction"

  service = inject(InsertTransactionService);

  signal = this.service.transactions;

  newSignal = signal('');

  currentTransaction: WritableSignal <Transaction | null> = signal(null);

  
}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  private createForm(): FormGroup {
    return this.fb.group({
      id: [0, [Validators.required]],
      userEmail: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      transactionDateTime: ['', [Validators.required]],
      description: [''],
      amount: [0, [Validators.required]]
    });
  }
}

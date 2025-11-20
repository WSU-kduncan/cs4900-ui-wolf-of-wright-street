import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TransactionService, Transaction } from '../../services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(TransactionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editing = false;
  editId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    amount: [0, Validators.required],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.editId = Number(idParam);

      const existing = this.service.transactions().find(t => t.id === this.editId);
      if (existing) {
        this.form.patchValue(existing);
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value as Transaction;

    if (this.editing && this.editId !== null) {
      this.service.updateTransaction(this.editId, value)
        .subscribe(() => this.router.navigateByUrl('/transactions'));
    } else {
      this.service.createTransaction(value)
        .subscribe(() => this.router.navigateByUrl('/transactions'));
    }
  }
}

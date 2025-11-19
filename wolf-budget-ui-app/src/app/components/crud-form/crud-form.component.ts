import { Component, OnInit, signal, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-crud-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crud-form.component.html',
  styleUrl: './crud-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

//form to handle inserts and edits
export class CrudFormComponent implements OnInit{
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);

  transactionForm: FormGroup;
  
  transactionId = input<number | null>(null);
  
  
    constructor() {
    this.transactionForm = this.createTransactionCrudForm();
  }

  ngOnInit(): void {
    // Watch building changes to reset room selection
       const id = this.transactionId();
    if (id) {
      this.loadTransaction(id);
    }
  }

    private loadWorkOrder(id: number): void {
    this.workOrderService.getWorkOrderById(id).subscribe({
      next: (workOrder) => {
        // Populate form with existing data
        this.workOrderForm.patchValue({
          title: workOrder.title,
          description: workOrder.description,
          categoryId: workOrder.category.id,
          buildingId: workOrder.room.id.buildingId,
          roomNumber: workOrder.room.id.roomNumber
        });
      }
    });
  }

  // create form for transaction
  createTransactionCrudForm(transaction?: Transaction): FormGroup {
  return this.fb.group({
    id: [transaction?.id || null], // optional id for edit
    userEmail: [transaction?.userEmail || 'user@wolf.com', [Validators.required, Validators.email]],
    categoryName: [transaction?.categoryName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        transactionDateTime: [
      transaction?.transactionDateTime || new Date().toISOString(),
      Validators.required],
    description: [transaction?.description || '', [Validators.maxLength(300)]],
    amount: [transaction?.amount || 0, [Validators.required, Validators.min(0.01)]]
  });
}
}

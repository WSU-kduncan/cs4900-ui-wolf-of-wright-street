import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model'
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  private readonly destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  transactionForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  constructor() {
    this.transactionForm = this.createForm();
  }

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

  onSubmit(): void {
    // Validation step
    if (!this.transactionForm.valid) {
      return;
    }

    // Extract and transform form data into a Transaction
    const formValue = this.transactionForm.value;
    this.createTransaction(formValue);
  }

  private createTransaction(formValue: any): void {
    // Transform data to a Transaction
    const newTransaction: Transaction = {
      id: Date.now(),
      userEmail: formValue.userEmail,
      categoryName: formValue.categoryName,
      transactionDateTime: new Date().toISOString(),
      description: formValue.description,
      amount: formValue.amount
    };

    // Send POST Request
    // Most of this code (error handing) was taken from MrFixIt
    this.transactionService.createTransaction(newTransaction).pipe(
    takeUntilDestroyed(this.destroyRef)
    ).subscribe({
    next: (transaction: any) => {
      // Success: Show message and navigate
      this.successMessage.set('Transaction created successfully!');
      this.isSubmitting.set(false);
      this.transactionForm.reset();
      
      // Navigate to detail page after delay
      setTimeout(() => {
        this.router.navigate(['/transactions', transaction.id]);
      }, 1500);
    },
    error: (error) => {
      // Error: Show message and keep form data
      console.error('Failed to create transaction:', error);
      this.errorMessage.set('Failed to create transaction. Please try again.');
      this.isSubmitting.set(false);
    }
    });
  }

  /*
   * The following few functions are from the MrFixIt repo.
   * These help check for invalidity for entries.
   */

    isFieldInvalid(fieldName: string): boolean {
    const field = this.transactionForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getFieldError(fieldName: string): string {
    // Enhanced error message generation with signal-based validation
    const field = this.transactionForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters.`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['min'].min}.`;
      }
      if (field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} cannot exceed ${field.errors['max'].max}.`;
      }
    }
    return '';
  }

    private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'userEmail': 'userEmail',
      'categoryName': 'categoryName',
      'description': 'description',
      'amount': 'amount'
    };
    return labels[fieldName] || fieldName;
  }
}

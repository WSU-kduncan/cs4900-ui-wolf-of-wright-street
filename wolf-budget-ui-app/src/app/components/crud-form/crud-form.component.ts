import { Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudFormComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  transactionId?: number; // edit mode to hold id if passed
  isEditMode = signal(false); // lets us know if edit mode is in play

  // Signals for form fields with defaults
  userEmail = signal('user@wolf.com');
  categoryName = signal('');
  transactionDateTime = signal(new Date().toISOString());
  description = signal('');
  amount = signal(0);

  // constructor to create objects needed
  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // check route, if id passed then we want to edit, react to that
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.transactionId = +idParam;
        this.isEditMode.set(true);
        this.loadTransaction(this.transactionId);
      }
    });
  }

  // load transaction if there and update signals to values
  private loadTransaction(id: number): void {
    this.transactionService.getTransactionById(id).subscribe({
      next: (transaction) => {
        this.userEmail.set(transaction.userEmail);
        this.categoryName.set(transaction.categoryName);
        this.transactionDateTime.set(transaction.transactionDateTime);
        this.description.set(transaction.description ?? '');
        this.amount.set(transaction.amount);
      },
      error: (err) => console.error('Failed to load transaction', err)
    });
  }

  //submit
  onSubmit(): void {
    // Simple validation example
    //if (!this.userEmail() || !this.categoryName() || this.amount() <= 0) return;

    const transactionData: Transaction = {
      id: this.transactionId ?? undefined,
      userEmail: this.userEmail(),
      categoryName: this.categoryName(),
      transactionDateTime: this.transactionDateTime(),
      description: this.description(),
      amount: this.amount()
    };

    if (this.isEditMode()) {
      this.transactionService.updateTransaction(this.transactionId!, transactionData)
        .subscribe(() => this.router.navigate(['/transactions']));
    } else {
      this.transactionService.createTransaction(transactionData)
        .subscribe(() => this.router.navigate(['/transactions']));
    }
  }
}


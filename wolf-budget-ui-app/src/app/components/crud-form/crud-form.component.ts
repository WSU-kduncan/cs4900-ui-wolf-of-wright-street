import { Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionCategory } from '../../models/transactioncategory.model';
import { TransactionCategoryService  } from '../../services/transaction-category.service';
import { forkJoin } from 'rxjs';


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


  transactionForm: FormGroup;
  transactionId?: number; // edit mode to hold id if passed
  isEditMode = signal(false); // lets us know if edit mode is in play
  //transactionCategories: TransactionCategory[] = []; // want to hold array of possible values for categories
  transactionCategories: WritableSignal<TransactionCategory[]> = signal([]);
  selectedCategory: WritableSignal<TransactionCategory | null> = signal(null);

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
    public router: Router,
    private route: ActivatedRoute,
    private categoryService: TransactionCategoryService
  ) {
    this.transactionForm = this.createTransactionForm();
    
  }

  createTransactionForm(transaction?: Transaction): FormGroup {
    return this.fb.group({
      id: [transaction?.id || null],
      userEmail: [transaction?.userEmail || 'user@wolf.com', [Validators.required, Validators.email]],
      categoryName: [transaction?.categoryName || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      transactionDateTime: [transaction?.transactionDateTime || new Date().toISOString(), Validators.required],
      description: [transaction?.description || '', [Validators.maxLength(300)]],
      amount: [transaction?.amount || 0, [Validators.required, Validators.min(0.01)]]
    });
  }

  

  // check route, if id passed then we want to edit, react to that
  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');

    if (idParam) {
      this.transactionId = +idParam;
      this.isEditMode.set(true);

      forkJoin({
        categories: this.categoryService.getCategories(),
        transaction: this.transactionService.getTransactionById(this.transactionId)
      }).subscribe({
        next: ({ categories, transaction }) => {
          this.transactionCategories.set(categories);

          this.transactionForm.patchValue({
            id: transaction.id,
            userEmail: transaction.userEmail,
            categoryName: transaction.categoryName,
            transactionDateTime: transaction.transactionDateTime,
            description: transaction.description ?? '',
            amount: transaction.amount
          });

          const cat = categories.find(c => c.categoryName === transaction.categoryName) ?? null;
          this.selectedCategory.set(cat);
        },
        error: (err) => console.error('Failed to load transaction or categories', err)
      });

    } else {
      //ensure edit is false
      this.isEditMode.set(false);
      
      this.categoryService.getCategories().subscribe({
        next: (categories) => this.transactionCategories.set(categories),
        error: (err) => console.error('Failed to load categories', err)
      });
    }
    });
  }

  //submit
  onSubmit(){
    // validate on form
    if(this.transactionForm.invalid) return; 
    //if(!this.)
    console.log('Submitted', this.transactionForm.get('amount')?.value);
    // 
    const transactionData: Transaction = {
      id: this.transactionForm.get('id')?.value ?? undefined,
      userEmail: this.transactionForm.get('userEmail')?.value,
      categoryName: this.transactionForm.get('categoryName')?.value,
      transactionDateTime: this.transactionForm.get('transactionDateTime')?.value || new Date().toISOString(),
      description: this.transactionForm.get('description')?.value,
      amount: this.transactionForm.get('amount')?.value
    };

     if (this.isEditMode() && this.transactionForm.get('id')?.value) {
    this.transactionService.updateTransaction(this.transactionForm.get('id')?.value, transactionData)
      .subscribe({
        next: () => {
          console.log('Transaction updated');
          this.router.navigate(['/transactions']);
        },
        error: (err) => console.error('Failed to update transaction', err)
      });
  } else {
    this.transactionService.createTransaction(transactionData)
      .subscribe({
        next: () => {
          console.log('Transaction created');
          this.router.navigate(['/transactions']);
        },
        error: (err) => console.error('Failed to create transaction', err)
      });
    }
  }
}


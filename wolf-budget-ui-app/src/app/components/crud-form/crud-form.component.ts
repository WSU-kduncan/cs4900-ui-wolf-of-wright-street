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
      transactionDateTime: [
      transaction ? this.formatDateTimeForInput(transaction.transactionDateTime) : this.formatDateTimeForInput(new Date()), Validators.required],
      description: [transaction?.description || '', [Validators.maxLength(300)]],
      amount: [transaction?.amount || 0, [Validators.required, Validators.min(0.01)]]
    });
  } 

  private formatDateTimeForInput(dateTime: string | Date): string {
    const date = new Date(dateTime);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
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
            transactionDateTime: this.formatDateTimeForInput(transaction.transactionDateTime),
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
  
  //validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.transactionForm.get(fieldName);
    console.log('called is field invalid: ', field);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
  
  //validation
  private getFieldLabel(fieldName: string): string {
  const labels: { [key: string]: string } = {
    'userEmail': 'User Email',
    'categoryName': 'Category',
    'description': 'Description',
    'amount': 'Amount',
    'transactionDateTime': 'Time Transaction'
  };
  return labels[fieldName] || fieldName;
}
  //fix it
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

  //submit
  onSubmit(){
    // validate on form
    if(this.transactionForm.invalid) { 
      // log back entry
      this.transactionForm.markAllAsTouched(); 
      return; 
    }

    // get date from form
    const formDateFormat = this.transactionForm.get('transactionDateTime')?.value; // e.g., "2025-11-26T14:30"

    // Convert local time to ISO string (UTC)
    const instantFormat = new Date(formDateFormat).toISOString();

  
    
    //if(!this.)
    console.log('Submitted', this.transactionForm.get('amount')?.value);
    // 
    const transactionData: Transaction = {
      id: this.transactionForm.get('id')?.value ?? undefined,
      userEmail: this.transactionForm.get('userEmail')?.value,
      categoryName: this.transactionForm.get('categoryName')?.value,
      transactionDateTime: instantFormat || new Date().toISOString(),
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


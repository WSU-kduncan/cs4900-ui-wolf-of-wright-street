import { User } from './user.model';
import { TransactionCategory } from './transactioncategory.model';

export interface Transaction {
  id?: number;
  //user: User;
  //category: TransactionCategory;
  // had to flatten since API send back info flat as well rather than object
  userEmail: string;
  categoryName: string;
  transactionDateTime: string; // ISO string from backend
  description?: string; // optional
  amount: number;
}
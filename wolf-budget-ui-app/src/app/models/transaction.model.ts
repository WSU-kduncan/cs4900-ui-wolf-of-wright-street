import { User } from './user.model';
import { TransactionCategory } from './transactioncategory.model';

export interface Transaction {
  id: number;
  user: User;
  category: TransactionCategory;
  transactionDateTime: string; // ISO string from backend
  description?: string; // optional
  amount: number;
}
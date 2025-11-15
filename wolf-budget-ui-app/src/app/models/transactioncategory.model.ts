import { CashflowType } from './cashflowtype.model';

export interface TransactionCategory {
  categoryName: string;
  categoryDescription?: string;
  cashflowType: string;
}
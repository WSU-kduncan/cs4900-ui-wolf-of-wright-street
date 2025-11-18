export interface Transaction {
  id: number;
  userEmail: string;
  categoryName: string;
  transactionDateTime: string;
  description?: string;
  amount: number;
}
// Transaction interface
export interface Transaction {
    id: number,
    userEmail: string,
    categoryName: string,
    transactionDateTime: string,
    description?: string,
    amount: number
}

export type createTransaction = Omit<Transaction, 'id'>
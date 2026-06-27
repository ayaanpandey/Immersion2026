import apiClient from './api';

export interface Account {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  active: boolean;
  createdAt: string;
}

export interface Transaction {
  id: number;
  amount: number;
  transactionType: string;
  status: string;
  description: string;
  transactionDate: string;
  accountId: number;
}

export const accountService = {
  getAccounts: () => apiClient.get<Account[]>('/accounts'),
  getAccount: (id: number) => apiClient.get<Account>(`/accounts/${id}`),
  createAccount: (type: string) => apiClient.post('/accounts', { accountType: type }),
};

export const transactionService = {
  getTransactions: (accountId: number, page = 0, size = 10) =>
    apiClient.get(`/transactions/account/${accountId}?page=${page}&size=${size}`),
  deposit: (accountId: number, amount: number, description: string) =>
    apiClient.post('/transactions/deposit', { accountId, amount, description }),
  withdraw: (accountId: number, amount: number, description: string) =>
    apiClient.post('/transactions/withdraw', { accountId, amount, description }),
  transfer: (fromAccountId: number, toAccountId: number, amount: number) =>
    apiClient.post('/transactions/transfer', { fromAccountId, toAccountId, amount }),
};

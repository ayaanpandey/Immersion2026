import React from 'react';
import './TransactionList.css';
import { Transaction } from '../services/accountService';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, loading }) => {
  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{new Date(tx.transactionDate).toLocaleDateString()}</td>
                <td className={`type ${tx.transactionType.toLowerCase()}`}>{tx.transactionType}</td>
                <td>{tx.description}</td>
                <td className={tx.transactionType === 'WITHDRAWAL' ? 'negative' : 'positive'}>
                  {tx.transactionType === 'WITHDRAWAL' ? '-' : '+'}{tx.amount.toFixed(2)}
                </td>
                <td className={`status ${tx.status.toLowerCase()}`}>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

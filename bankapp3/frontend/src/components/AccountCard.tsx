import React from 'react';
import './AccountCard.css';
import { Account } from '../services/accountService';

interface AccountCardProps {
  account: Account;
  onClick: (accountId: number) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, onClick }) => {
  return (
    <div className="account-card" onClick={() => onClick(account.id)}>
      <div className="account-header">
        <h3>{account.accountType}</h3>
        <span className={`status ${account.active ? 'active' : 'inactive'}`}>
          {account.active ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="account-number">Account: {account.accountNumber}</div>
      <div className="account-balance">
        <span className="label">Balance</span>
        <span className="amount">{account.currency} {account.balance.toFixed(2)}</span>
      </div>
      <div className="account-date">Created: {new Date(account.createdAt).toLocaleDateString()}</div>
    </div>
  );
};

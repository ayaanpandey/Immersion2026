import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import { AccountCard } from '../components/AccountCard';
import { TransactionList } from '../components/TransactionList';
import { accountService, Account, Transaction } from '../services/accountService';
import { useAuthStore } from '../services/authStore';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const response = await accountService.getAccounts();
      setAccounts(response.data);
      if (response.data.length > 0) {
        setSelectedAccount(response.data[0]);
        loadTransactions(response.data[0].id);
      }
    } catch (error) {
      console.error('Failed to load accounts', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async (accountId: number) => {
    try {
      const response = await accountService.getTransactions(accountId);
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to load transactions', error);
    }
  };

  const handleAccountClick = (accountId: number) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      setSelectedAccount(account);
      loadTransactions(accountId);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Banking Dashboard</h1>
        <div className="user-info">
          <span>{user?.firstName} {user?.lastName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="accounts-section">
          <h2>Your Accounts</h2>
          {loading ? (
            <p>Loading accounts...</p>
          ) : accounts.length === 0 ? (
            <p>No accounts found. <a href="/create-account">Create one</a></p>
          ) : (
            <div className="accounts-list">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onClick={handleAccountClick}
                />
              ))}
            </div>
          )}
        </section>

        {selectedAccount && (
          <section className="transactions-section">
            <div className="account-operations">
              <h2>Account Operations</h2>
              <div className="operations-buttons">
                <button className="op-btn deposit">Deposit</button>
                <button className="op-btn withdraw">Withdraw</button>
                <button className="op-btn transfer">Transfer</button>
              </div>
            </div>
            <TransactionList transactions={transactions} />
          </section>
        )}
      </main>
    </div>
  );
};

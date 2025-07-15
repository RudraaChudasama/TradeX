import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowRight, DollarSign, Bitcoin, RefreshCw, Clock } from 'lucide-react';
import './Wallet.css';

function WalletPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const balanceData = {
    total: '12,234.56',
    btc: '0.2345',
    eth: '1.567',
    usdt: '5,678.90'
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'Deposit',
      amount: '+0.5 BTC',
      status: 'Completed',
      date: '2024-04-14'
    }
  ];

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <div className="wallet-title">
          <h1>Wallet Overview</h1>
          <p className="wallet-subtitle">Manage your crypto assets</p>
        </div>
        <div className="wallet-actions">
          <button className="action-btn deposit">
            <DollarSign size={20} />
            Deposit
          </button>
          <button className="action-btn withdraw">
            <ArrowRight size={20} />
            Withdraw
          </button>
        </div>
      </div>

      <div className="wallet-content">
        <div className="balance-cards">
          <div className="balance-card total">
            <div className="card-header">
              <WalletIcon size={24} />
              <h3>Total Balance</h3>
            </div>
            <div className="balance-amount">
              <span className="currency">$</span>
              <span className="amount">{balanceData.total}</span>
            </div>
          </div>

          <div className="balance-card crypto">
            <div className="card-header">
              <Bitcoin size={24} />
              <h3>BTC Balance</h3>
            </div>
            <div className="balance-amount">
              <span className="amount">{balanceData.btc}</span>
              <span className="currency">BTC</span>
            </div>
          </div>
          {/* Add more balance cards */}
        </div>

        <div className="transactions-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <RefreshCw size={20} className="refresh-icon" />
          </div>

          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <Clock size={16} />
                  <span className="transaction-type">{transaction.type}</span>
                  <span className="transaction-amount">{transaction.amount}</span>
                </div>
                <div className="transaction-status">
                  <span className={`status ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
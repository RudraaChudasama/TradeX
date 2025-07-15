import React, { useState, useEffect } from 'react';
import { Wallet, ArrowRight, DollarSign, AlertTriangle } from 'lucide-react';
import './SellCrypto.css'; // Import global styles
export default function SellCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [receiveMethod, setReceiveMethod] = useState('bank');
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [showAddressField, setShowAddressField] = useState(false);
  const [networkFee, setNetworkFee] = useState(0.0005);

  // Mock exchange rates
  const exchangeRates = {
    BTC: 45000,
    ETH: 3200,
    USDT: 1
  };

  // Mock network fees
  const networkFees = {
    BTC: 0.0005,
    ETH: 0.01,
    USDT: 2
  };

  useEffect(() => {
    // Update network fee when crypto changes
    setNetworkFee(networkFees[selectedCrypto]);
  }, [selectedCrypto]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    // Calculate estimated value based on current rates
    setEstimatedValue(e.target.value * exchangeRates[selectedCrypto]);
  };

  const handleReceiveMethodChange = (e) => {
    setReceiveMethod(e.target.value);
    setShowAddressField(e.target.value === 'crypto');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selling ${amount} ${selectedCrypto} for $${estimatedValue.toFixed(2)} via ${receiveMethod}`);
    // Handle sell logic here
  };

  return (
    <section className="sell-crypto-section">
      <div className="title-wrapper" data-animate="fade-up">
        <div>
          <h2 className="section-title">Sell Crypto</h2>
          <p className="section-subtitle">Convert your cryptocurrency to fiat instantly</p>
        </div>
      </div>

      <div className="sell-crypto-container">
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label className="form-label">Select Cryptocurrency</label>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="form-select"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>
          

          <div className="form-group">
            <label className="form-label">Amount to Sell</label>
            <div className="input-wrapper">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                step="0.0001"
                min="0"
                className="form-input"
              />
              <span className="currency-symbol">{selectedCrypto}</span>
            </div>
          </div>

          <div className="estimated-value">
            <p className="value-label">Estimated Value</p>
            <p className="estimated-amount">${estimatedValue.toFixed(2)}</p>
            <ArrowRight className="arrow-icon" size={20} />
          </div>

          <div className="form-group">
            <label className="form-label">Receive Method</label>
            <select
              value={receiveMethod}
              onChange={handleReceiveMethodChange}
              className="form-select"
            >
              <option value="bank">Bank Account</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Crypto Address</option>
            </select>
          </div>

          {showAddressField && (
            <div className="form-group">
              <label className="form-label">Withdrawal Address</label>
              <input
                type="text"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder={`Enter ${selectedCrypto} address`}
                className="form-input"
              />
              <div className="warning">
                <AlertTriangle size={16} className="warning-icon" />
                <p>Please double-check the address. Transactions cannot be reversed.</p>
              </div>
            </div>
          )}

          {showAddressField && (
            <div className="network-fee">
              <div className="fee-details">
                <span className="fee-label">Network Fee</span>
                <span className="fee-amount">{networkFee} {selectedCrypto}</span>
              </div>
              <div className="fee-details">
                <span className="fee-label">You'll Receive</span>
                <span className="fee-amount">
                  {amount > 0 ? (amount - networkFee).toFixed(6) : '0.00'} {selectedCrypto}
                </span>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">
            <div className="button-content">
              <DollarSign size={20} />
              <span>Sell Now</span>
            </div>
          </button>
        </form>
      </div>
    </section>
  );
}
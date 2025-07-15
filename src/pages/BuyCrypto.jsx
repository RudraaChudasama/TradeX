import React, { useState, useEffect } from 'react';
import { TrendingUp, CreditCard, DollarSign, Clock } from 'lucide-react';
import './BuyCrypto.css'; // Assuming you have a CSS file for styling
function BuyCrypto() {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [spendAmount, setSpendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('buy');
  const [focusedInput, setFocusedInput] = useState(null);

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', price: 45000, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 3200, icon: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', price: 1, icon: '₮' },
    { symbol: 'BNB', name: 'Binance Coin', price: 410, icon: 'BNB' },
    { symbol: 'SOL', name: 'Solana', price: 130, icon: 'SOL' },
    { symbol: 'CAT', name: 'CAT Token', price: 0.05, icon: '🐱' },
  ];

  const paymentOptions = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={16} className="payment-method-icon" /> },
    { id: 'bank', name: 'Bank Transfer', icon: <DollarSign size={16} className="payment-method-icon" /> },
  ];

  // Calculate estimated crypto amount based on input
  useEffect(() => {
    if (spendAmount && focusedInput === 'spend') {
      const cryptoPrice = cryptoOptions.find(c => c.symbol === selectedCrypto)?.price || 0;
      const estimated = parseFloat(spendAmount) / cryptoPrice;
      setReceiveAmount(isNaN(estimated) ? '' : estimated.toFixed(8));
    }
  }, [spendAmount, selectedCrypto, focusedInput]);

  // Calculate spend amount based on crypto input
  useEffect(() => {
    if (receiveAmount && focusedInput === 'receive') {
      const cryptoPrice = cryptoOptions.find(c => c.symbol === selectedCrypto)?.price || 0;
      const estimated = parseFloat(receiveAmount) * cryptoPrice;
      setSpendAmount(isNaN(estimated) ? '' : estimated.toFixed(2));
    }
  }, [receiveAmount, selectedCrypto, focusedInput]);

  const handleSpendChange = (e) => {
    setSpendAmount(e.target.value);
    setFocusedInput('spend');
  };

  const handleReceiveChange = (e) => {
    setReceiveAmount(e.target.value);
    setFocusedInput('receive');
  };

  const handleQuickAmount = (amount) => {
    setSpendAmount(amount.toString());
    setFocusedInput('spend');
  };

  const handleCryptoChange = (crypto) => {
    setSelectedCrypto(crypto);
    // Recalculate based on current focused input
    if (focusedInput === 'spend' && spendAmount) {
      const cryptoPrice = cryptoOptions.find(c => c.symbol === crypto)?.price || 0;
      const estimated = parseFloat(spendAmount) / cryptoPrice;
      setReceiveAmount(isNaN(estimated) ? '' : estimated.toFixed(8));
    } else if (focusedInput === 'receive' && receiveAmount) {
      const cryptoPrice = cryptoOptions.find(c => c.symbol === crypto)?.price || 0;
      const estimated = parseFloat(receiveAmount) * cryptoPrice;
      setSpendAmount(isNaN(estimated) ? '' : estimated.toFixed(2));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!spendAmount || isNaN(spendAmount) || parseFloat(spendAmount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      if (parseFloat(spendAmount) < 10) {
        throw new Error('Minimum purchase amount is $10');
      }

      // Simulate payment processing
      await processCryptoPayment({
        cryptoType: selectedCrypto,
        spendAmount: parseFloat(spendAmount),
        receiveAmount: parseFloat(receiveAmount),
        paymentMethod,
        timestamp: new Date().toISOString()
      });

      // Show success message
      alert(`Successfully purchased ${receiveAmount} ${selectedCrypto}`);
      
      // Reset form
      setSpendAmount('');
      setReceiveAmount('');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulate payment processing
  const processCryptoPayment = async (paymentDetails) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  };

  return (
    <section className="crypto-buy-section">
      <div className="title-wrapper">
        <div className="title-content">
          <h2 className="section-title">Buy Cryptocurrency</h2>
          <p className="section-subtitle">
            Purchase your favorite cryptocurrencies instantly with your preferred payment method. 
            Fast, secure, and hassle-free trading experience.
          </p>
        </div>
      </div>

      <div className="crypto-buy-container">
        {/* Tab navigation */}
        <div className="crypto-tabs">
          <button 
            className={`crypto-tab ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            <CreditCard size={16} className="crypto-tab-icon" />
            Buy
          </button>
          <button 
            className={`crypto-tab ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            <TrendingUp size={16} className="crypto-tab-icon" />
            Sell
          </button>
        </div>

        <div className="buy-form-container">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Spend section */}
            <div className="form-group">
              <div className="form-header">
                <label className="form-label">Spend</label>
                {activeTab === 'buy' && (
                  <span className="form-subtitle">You pay with USD</span>
                )}
              </div>
              
              <div className="form-input-wrapper">
                <div className="form-input-currency">
                  <span>USD</span>
                </div>
                <input
                  type="number"
                  value={spendAmount}
                  onChange={handleSpendChange}
                  onFocus={() => setFocusedInput('spend')}
                  placeholder="Enter amount"
                  className="form-input"
                  disabled={loading}
                  min="10"
                  step="any"
                />
              </div>

              {/* Quick amount selector */}
              <div className="quick-amount-container">
                {[50, 100, 200, 500].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleQuickAmount(amount)}
                    className="quick-amount-btn"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <div className="payment-methods">
                {paymentOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPaymentMethod(option.id)}
                    className={`payment-method-btn ${paymentMethod === option.id ? 'selected' : ''}`}
                  >
                    {option.icon}
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Receive section */}
            <div className="form-group">
              <label className="form-label">Receive</label>
              
              {/* Crypto selection */}
              <div className="crypto-options">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    type="button"
                    onClick={() => handleCryptoChange(crypto.symbol)}
                    className={`crypto-option-btn ${selectedCrypto === crypto.symbol ? 'selected' : ''}`}
                  >
                    <span className="crypto-icon">{crypto.icon}</span>
                    <span>{crypto.symbol}</span>
                  </button>
                ))}
              </div>
              
              {/* Receive amount */}
              <div className="form-input-wrapper">
                <div className="form-input-currency">
                  <span>{selectedCrypto}</span>
                </div>
                <input
                  type="number"
                  value={receiveAmount}
                  onChange={handleReceiveChange}
                  onFocus={() => setFocusedInput('receive')}
                  placeholder="You receive"
                  className="form-input"
                  disabled={loading}
                  step="any"
                />
              </div>
              
              {selectedCrypto && spendAmount && (
                <div className="price-info">
                  Price: 1 {selectedCrypto} ≈ ${cryptoOptions.find(c => c.symbol === selectedCrypto)?.price.toFixed(2)} USD
                </div>
              )}
            </div>

            {/* Order details */}
            {spendAmount && receiveAmount && (
              <div className="order-details">
                <h3 className="order-details-title">Order Details</h3>
                <div className="order-detail-row">
                  <span className="order-detail-label">Price</span>
                  <span className="order-detail-value">${cryptoOptions.find(c => c.symbol === selectedCrypto)?.price.toFixed(2)} per {selectedCrypto}</span>
                </div>
                <div className="order-detail-row">
                  <span className="order-detail-label">You Pay</span>
                  <span className="order-detail-value">${parseFloat(spendAmount).toFixed(2)} USD</span>
                </div>
                <div className="order-detail-row">
                  <span className="order-detail-label">You Receive</span>
                  <span className="order-detail-value">{parseFloat(receiveAmount).toFixed(8)} {selectedCrypto}</span>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || !spendAmount || !receiveAmount}
            >
              {loading && <span className="loading-indicator"></span>}
              {loading ? 'Processing...' : `Buy ${selectedCrypto}`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BuyCrypto;
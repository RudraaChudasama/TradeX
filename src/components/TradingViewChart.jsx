import React, { useEffect, useRef } from 'react';
import './TradingViewChart.css';

function TradingViewChart({ symbol, onClose }) {
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="trading-modal" onClick={handleClickOutside}>
      <div className="trading-modal-content" ref={modalRef}>
        <div className="trading-modal-header">
          <h2>{symbol} Live Chart</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="trading-chart-container">
          <iframe
            title={`${symbol} TradingView Chart`}
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=BINANCE:${symbol}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=exchange&withdateranges=1&showpopupbutton=1`}
            style={{
              width: '100%',
              height: '600px',
              border: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TradingViewChart;
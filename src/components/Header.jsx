import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => { 
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.svg" width="50" height="50" alt="TradeX logo" />
          TradeX
        </Link>

        <nav className={`navbar ${isNavOpen ? 'active' : ''}`}>
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/buy" className={`navbar-link ${location.pathname === '/buy' ? 'active' : ''}`}>
                Buy Crypto
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/markets" className={`navbar-link ${location.pathname === '/markets' ? 'active' : ''}`}>
                Markets
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/sell" className={`navbar-link ${location.pathname === '/sell' ? 'active' : ''}`}>
                Sell Crypto
              </Link>
            </li>
          </ul>
        </nav>

        <button 
          className="nav-toggle-btn" 
          aria-label="Toggle menu" 
          onClick={toggleNav}
        >
          <span className={`line line-1 ${isNavOpen ? 'active' : ''}`}></span>
          <span className={`line line-2 ${isNavOpen ? 'active' : ''}`}></span>
          <span className={`line line-3 ${isNavOpen ? 'active' : ''}`}></span>
        </button>

        <div className="header-actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/wallet" className="btn btn-outline">Wallet</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
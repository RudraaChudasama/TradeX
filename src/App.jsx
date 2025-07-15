import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Star, CheckCircle, Facebook, Twitter, Instagram, Linkedin, Wallet, CircleDollarSign, Building, Coins, Layers, Gem, Dices, PaintBucket, Binary, Rocket, Boxes, Aperture, Puzzle, Zap, Palette, Landmark } from 'lucide-react';
import Header from './components/Header';
import BuyCrypto from './pages/BuyCrypto';
import Markets from './pages/Markets';
import SellCrypto from './pages/SellCrypto';
import Login from './pages/Login';
import WalletPage from './pages/WalletPage'; // Renamed to avoid conflict with Lucide icon
import './App.css';
import TradingViewChart from './components/TradingViewChart';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyCrypto />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/sell" element={<SellCrypto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch all other routes */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Home component with repeating animations
function Home() {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        // Remove animation class when element is not in view
        if (!entry.isIntersecting) {
          entry.target.classList.remove('animate-in');
        } else {
          // Add animation class when element comes into view
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
      // Reset animation classes initially
      element.classList.remove('animate-in');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <article>
        <HeroSection />
        <TrendSection />
        <MarketSection />
        <InstructionSection />
        <AboutSection />
        <AppSection />
      </article>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content" data-animate="fade-up">
          <h1 className="hero-title">Buy & Sell Digital Assets In The TradeX</h1>
          <p className="hero-text">TradeX is the easiest, safest, and fastest way to buy & sell crypto assets.</p>
          <Link to="/markets" className="btn btn-primary">Get started now</Link>
        </div>
        <figure className="hero-banner" data-animate="fade-left" data-delay="200">
          <img src="/assets/images/hero-banner.png" alt="hero banner" />
        </figure>
      </div>
    </section>
  );
}

function TrendSection() {
  const [activeTab, setActiveTab] = useState('Crypto');
  
  const tabData = [
    'Crypto', 'DeFi', 'BSC', 'NFT', 'Solana', 'Makersplace'
  ];

  const trendCardsData = {
    // Keep Crypto data as is with original images
    Crypto: [
      {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC/USD',
        icon: '/assets/images/coin-1.svg',
        value: 46168.95,
        currentPrice: 36641.20,
        change: -0.79,
      },
      {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH/USD',
        icon: '/assets/images/coin-2.svg',
        value: 3480.04,
        currentPrice: 36641.20,
        change: 10.55,
      },
      {
        id: 3,
        name: 'Tether',
        symbol: 'USDT/USD',
        icon: '/assets/images/coin-3.svg',
        value: 1.00,
        currentPrice: 1.00,
        change: -0.01,
      },
      {
        id: 4,
        name: 'BNB',
        symbol: 'BNB/USD',
        icon: '/assets/images/coin-4.svg',
        value: 443.56,
        currentPrice: 443.20,
        change: -1.24,
      },
    ],
    // Update other categories to use Lucide icons
    DeFi: [
      {
        id: 1,
        name: 'Uniswap',
        symbol: 'UNI/USD',
        icon: <Wallet size={24} className="defi-icon" />,
        value: 5.23,
        currentPrice: 5.20,
        change: 2.35,
      },
      {
        id: 2,
        name: 'Aave',
        symbol: 'AAVE/USD',
        icon: <Building size={24} className="defi-icon" />,
        value: 62.45,
        currentPrice: 61.25,
        change: -1.23,
      },
      {
        id: 3,
        name: 'Compound',
        symbol: 'COMP/USD',
        icon: <Landmark size={24} className="defi-icon" />,
        value: 47.82,
        currentPrice: 47.50,
        change: 3.45,
      },
      {
        id: 4,
        name: 'Curve',
        symbol: 'CRV/USD',
        icon: <CircleDollarSign size={24} className="defi-icon" />,
        value: 0.58,
        currentPrice: 0.57,
        change: 1.82,
      },
    ],
    BSC: [
      {
        id: 1,
        name: 'PancakeSwap',
        symbol: 'CAKE/USD',
        icon: <Layers size={24} className="bsc-icon" />,
        value: 2.34,
        currentPrice: 2.28,
        change: 3.45,
      },
      {
        id: 2,
        name: 'Venus',
        symbol: 'XVS/USD',
        icon: <Rocket size={24} className="bsc-icon" />,
        value: 5.67,
        currentPrice: 5.60,
        change: -2.15,
      },
      {
        id: 3,
        name: 'THORChain',
        symbol: 'RUNE/USD',
        icon: <Zap size={24} className="bsc-icon" />,
        value: 4.32,
        currentPrice: 4.25,
        change: 5.67,
      },
      {
        id: 4,
        name: 'Biswap',
        symbol: 'BSW/USD',
        icon: <Binary size={24} className="bsc-icon" />,
        value: 0.23,
        currentPrice: 0.22,
        change: -1.25,
      },
    ],
    NFT: [
      {
        id: 1,
        name: 'ApeCoin',
        symbol: 'APE/USD',
        icon: <Puzzle size={24} className="nft-icon" />,
        value: 1.45,
        currentPrice: 1.42,
        change: 2.34,
      },
      {
        id: 2,
        name: 'Decentraland',
        symbol: 'MANA/USD',
        icon: <Boxes size={24} className="nft-icon" />,
        value: 0.43,
        currentPrice: 0.42,
        change: -1.56,
      },
      {
        id: 3,
        name: 'The Sandbox',
        symbol: 'SAND/USD',
        icon: <Dices size={24} className="nft-icon" />,
        value: 0.45,
        currentPrice: 0.44,
        change: 3.21,
      },
      {
        id: 4,
        name: 'Render',
        symbol: 'RNDR/USD',
        icon: <Palette size={24} className="nft-icon" />,
        value: 7.23,
        currentPrice: 7.15,
        change: -2.45,
      },
    ],
    Solana: [
      {
        id: 1,
        name: 'Solana',
        symbol: 'SOL/USD',
        icon: <Aperture size={24} className="sol-icon" />,
        value: 95.67,
        currentPrice: 94.50,
        change: 4.56,
      },
      {
        id: 2,
        name: 'Raydium',
        symbol: 'RAY/USD',
        icon: <Gem size={24} className="sol-icon" />,
        value: 0.34,
        currentPrice: 0.33,
        change: 2.78,
      },
      {
        id: 3,
        name: 'Serum',
        symbol: 'SRM/USD',
        icon: <Binary size={24} className="sol-icon" />,
        value: 0.12,
        currentPrice: 0.11,
        change: -3.45,
      },
      {
        id: 4,
        name: 'Orca',
        symbol: 'ORCA/USD',
        icon: <PaintBucket size={24} className="sol-icon" />,
        value: 0.02,
        currentPrice: 0.019,
        change: 5.67,
      },
    ],
    Makersplace: [
      {
        id: 1,
        name: 'Maker',
        symbol: 'MKR/USD',
        icon: <Building size={24} className="maker-icon" />,
        value: 1205.30,
        currentPrice: 1200.00,
        change: 1.82,
      },
      {
        id: 2,
        name: 'DAI',
        symbol: 'DAI/USD',
        icon: <CircleDollarSign size={24} className="maker-icon" />,
        value: 1.00,
        currentPrice: 1.00,
        change: 0.01,
      },
      {
        id: 3,
        name: 'Balancer',
        symbol: 'BAL/USD',
        icon: <Coins size={24} className="maker-icon" />,
        value: 4.12,
        currentPrice: 4.10,
        change: -1.23,
      },
      {
        id: 4,
        name: 'Instadapp',
        symbol: 'INST/USD',
        icon: <Layers size={24} className="maker-icon" />,
        value: 3.12,
        currentPrice: 3.10,
        change: 2.45,
      },
    ],
  };

  // Add error handling for images
  const handleImageError = (e) => {
    e.target.src = '/assets/images/fallback-crypto-icon.svg';
  };

  return (
    <section className="trend">
      <div className="container">
        <div className="trend-tab" data-animate="fade-up">
          <ul className="tab-nav">
            {tabData.map((tab) => (
              <li key={tab}>
                <button 
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          <ul className="tab-content">
            {trendCardsData[activeTab]?.map((card) => (
              <li key={card.id}>
                <div className={`trend-card ${card.change > 0 ? 'active' : ''}`}>
                  <div className="card-title-wrapper">
                    {activeTab === 'Crypto' ? (
                      <img 
                        src={card.icon} 
                        width="24" 
                        height="24" 
                        alt={`${card.name} logo`} 
                        style={{ borderRadius: '50%' }}
                      />
                    ) : (
                      <span className="icon-wrapper">
                        {card.icon}
                      </span>
                    )}
                    <a href="/" className="card-title">
                      {card.name} <span className="span">{card.symbol}</span>
                    </a>
                  </div>
                  <data className="card-value" value={card.value}>
                    USD {card.value.toLocaleString()}
                  </data>
                  <div className="card-analytics">
                    <data className="current-price" value={card.currentPrice}>
                      {card.currentPrice.toLocaleString()}
                    </data>
                    <div className={`badge ${card.change >= 0 ? 'green' : 'red'}`}>
                      {card.change >= 0 ? '+' : ''}{card.change}%
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MarketSection() {
  const [activeTab, setActiveTab] = useState('View All');
  const [favorites, setFavorites] = useState({});
  const [marketPrices, setMarketPrices] = useState({});
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  
  const tabData = [
    'View All', 'Metaverse', 'Entertainment', 'Energy', 'NFT', 'Gaming', 'Music'
  ];

  // Base market data
  const marketData = [
    {
      id: 1,
      name: 'Bitcoin',
      abbr: 'BTC',
      symbol: 'btcusdt',
      img: '/assets/images/coin-1.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-1.svg'
    },
    {
      id: 2,
      name: 'Ethereum',
      abbr: 'ETH',
      symbol: 'ethusdt',
      img: '/assets/images/coin-2.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-2.svg'
    },
    {
      id: 3,
      name: 'Tether',
      abbr: 'USDT/USD',
      symbol: 'usdtusdt',
      img: '/assets/images/coin-3.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-1.svg'
    },
    {
      id: 4,
      name: 'BNB',
      abbr: 'BNB/USD',
      symbol: 'bnbusdt',
      img: '/assets/images/coin-4.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-2.svg'
    },
    {
      id: 5,
      name: 'Solana',
      abbr: 'SOL',
      symbol: 'solusdt',
      img: '/assets/images/coin-5.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-1.svg'
    },
    {
      id: 6,
      name: 'XRP',
      abbr: 'XRP',
      symbol: 'xrpusdt',
      img: '/assets/images/coin-6.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-2.svg'
    },
    {
      id: 7,
      name: 'Cardano',
      abbr: 'ADA',
      symbol: 'adausdt',
      img: '/assets/images/coin-7.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-1.svg'
    },
    {
      id: 8,
      name: 'Avalanche',
      abbr: 'AVAX',
      symbol: 'avaxusdt',
      img: '/assets/images/coin-8.svg',
      marketCap: '$880,423,640,582',
      chart: '/assets/images/chart-1.svg'
    }
  ];

  // Add WebSocket connection
  useEffect(() => {
    let ws = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connectWebSocket = () => {
      ws = new WebSocket('wss://stream.binance.com:9443/ws');

      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsWebSocketConnected(true);
        reconnectAttempts = 0;

        // Subscribe to market symbols
        const symbols = marketData.map(m => m.symbol.toLowerCase());
        const subscribeMsg = {
          method: 'SUBSCRIBE',
          params: symbols.map(symbol => `${symbol}@ticker`),
          id: 1
        };
        ws.send(JSON.stringify(subscribeMsg));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.s && data.c && data.p) {
          setMarketPrices(prev => ({
            ...prev,
            [data.s.toLowerCase()]: {
              price: parseFloat(data.c),
              change: parseFloat(data.p)
            }
          }));
        }
      };

      ws.onclose = () => {
        setIsWebSocketConnected(false);
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log('WebSocket disconnected. Reconnecting...');
          reconnectAttempts++;
          setTimeout(connectWebSocket, 3000);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Update the rendering part to use live prices
  const getMarketRow = (coin) => {
    const liveData = marketPrices[coin.symbol];
    const price = liveData ? `$${liveData.price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}` : 'Loading...';
    
    const change = liveData ? liveData.change : 0;
    const isPositive = change >= 0;
    const changeFormatted = liveData ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '0.00%';

    return (
      <tr className="table-row" key={coin.id}>
        <td className="table-data">
          <button 
            className="add-to-fav" 
            aria-label="Add to favourite"
            onClick={() => toggleFavorite(coin.id)}
          >
            {favorites[coin.id] ? (
              <Star className="icon-fill" fill="currentColor" />
            ) : (
              <Star className="icon-outline" />
            )}
          </button>
        </td>
        <th className="table-data rank" scope="row">{coin.id}</th>
        <td className="table-data">
          <div className="wrapper">
            <img 
              src={coin.img} 
              width="20" 
              height="20" 
              alt={`${coin.name} logo`} 
              className="img"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/assets/images/fallback-coin.svg';
              }}
            />
            <h3>
              <a href="/" className="coin-name">
                {coin.name} <span className="span">{coin.abbr}</span>
              </a>
            </h3>
          </div>
        </td>
        <td className="table-data last-price">{price}</td>
        <td className={`table-data last-update ${isPositive ? 'green' : 'red'}`}>
          {changeFormatted}
        </td>
        <td className="table-data market-cap">{coin.marketCap}</td>
        <td className="table-data">
          <img 
            src={coin.chart} 
            width="100" 
            height="40" 
            alt={`${isPositive ? 'profit' : 'loss'} chart`} 
            className="chart"
            loading="lazy"
          />
        </td>
        <td className="table-data">
          <button 
            className="btn btn-outline"
            onClick={() => setSelectedTrade(coin.symbol)}
          >
            Trade
          </button>
        </td>
      </tr>
    );
  };

  return (
    <section className="market">
      <div className="container">
        <div className="title-wrapper" data-animate="fade-up">
          <h2 className="h2 section-title">Market Update</h2>
          <a href="#" className="btn-link">See All Coins</a>
        </div>
        <div className="market-tab" data-animate="fade-up" data-delay="200">
          {/* Add tab navigation */}
          <ul className="tab-nav">
            {tabData.map((tab) => (
              <li key={tab}>
                <button
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* Market table */}
          <div className="table-container">
            <table className="market-table">
              <thead className="table-head">
                <tr className="table-row table-title">
                  <th className="table-heading"></th>
                  <th className="table-heading" scope="col">#</th>
                  <th className="table-heading" scope="col">Name</th>
                  <th className="table-heading" scope="col">Last Price</th>
                  <th className="table-heading" scope="col">24h %</th>
                  <th className="table-heading" scope="col">Market Cap</th>
                  <th className="table-heading" scope="col">Last 7 Days</th>
                  <th className="table-heading"></th>
                </tr>
              </thead>

              <tbody className="table-body">
                {marketData.map(coin => getMarketRow(coin))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Add the trading chart modal */}
        {selectedTrade && (
          <TradingViewChart 
            symbol={selectedTrade.toUpperCase()} 
            onClose={() => setSelectedTrade(null)}
          />
        )}
      </div>
    </section>
  );
}

function InstructionSection() {
  const instructionSteps = [
    {
      id: 1,
      img: '/assets/images/instruction-1.png',
      title: 'Download',
      text: 'Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.'
    },
    {
      id: 2,
      img: '/assets/images/instruction-2.png',
      title: 'Connect Wallet',
      text: 'Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.'
    },
    {
      id: 3,
      img: '/assets/images/instruction-3.png',
      title: 'Start Trading',
      text: 'Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.'
    },
    {
      id: 4,
      img: '/assets/images/instruction-4.png',
      title: 'Earn Money',
      text: 'Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.'
    }
  ];

  return (
    <section className="section instruction" aria-label="instruction">
      <div className="container">
        <h2 className="h2 section-title">How It Work</h2>
        <p className="section-text">
          Stacks is a production-ready library of stackable content blocks built in React Native.
        </p>

        <ul className="instruction-list">
          {instructionSteps.map((step) => (
            <li key={step.id}>
              <div className="instruction-card">
                <figure className="card-banner">
                  <img src={step.img} width="96" height="96" loading="lazy" alt={`Step ${step.id}`} className="img" />
                </figure>
                <p className="card-subtitle">Step {step.id}</p>
                <h3 className="h3 card-title">{step.title}</h3>
                <p className="card-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AboutSection() {
  const benefitsList = [
    {
      id: 1,
      title: 'View real-time cryptocurrency prices',
      text: 'Experience a variety of trading on Bitcost. You can use various types of coin transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.'
    },
    {
      id: 2,
      title: 'Buy and sell BTC, ETH, XRP, OKB, Etc...',
      text: 'Experience a variety of trading on Bitcost. You can use various types of coin transactions such as Spot Trade, Futures Trade, P2P, Staking, Mining, and margin.'
    }
  ];

  return (
    <section className="about">
      <div className="container">
        <figure className="about-banner" data-animate="fade-right">
          <img src="/assets/images/about-banner.png" alt="about banner" />
        </figure>
        <div className="about-content" data-animate="fade-left" data-delay="200">
          <h2 className="h2 section-title">What Is TradeX</h2>
          <p className="section-text">
            Experience a variety of trading on Bitcost. You can use various types of coin transactions such as Spot
            Trade, Futures Trade, P2P, Staking, Mining, and margin.
          </p>

          <ul className="section-list">
            {benefitsList.map((item) => (
              <li className="section-item" key={item.id}>
                <div className="title-wrapper">
                  <CheckCircle aria-hidden="true" />
                  <h3 className="h3 list-title">{item.title}</h3>
                </div>
                <p className="item-text">{item.text}</p>
              </li>
            ))}
          </ul>

          <a href="/" className="btn btn-primary">Explore More</a>
        </div>
      </div>
    </section>
  );
}

function AppSection() {
  const appFeatures = [
    {
      id: 1,
      title: 'Buy, Sell, And Trade On The Go',
      text: 'Manage Your Holdings From Your Mobile Decive'
    },
    {
      id: 2,
      title: 'Take Control Of Your Wealth',
      text: 'Rest Assured You (And Only You) Have Access To Your Funds'
    }
  ];

  return (
    <section className="app">
      <div className="container">
        <div className="app-content" data-animate="fade-right">
          <h2 className="h2 section-title">Free Your Money & Invest With Confident</h2>
          <p className="section-text">
            With Cryptor Trade, you can be sure your trading skills are matched
          </p>

          <ul className="section-list">
            {appFeatures.map((feature) => (
              <li className="section-item" key={feature.id}>
                <div className="title-wrapper">
                  <CheckCircle aria-hidden="true" />
                  <h3 className="h3 item-title">{feature.title}</h3>
                </div>
                <p className="item-text">{feature.text}</p>
              </li>
            ))}
          </ul>

          <div className="app-wrapper">
            <a href="/">
              <img src="/assets/images/googleplay.png" width="135" height="40" loading="lazy" alt="get it on google play" />
            </a>
            <a href="/">
              <img src="/assets/images/appstore.png" width="120" height="40" loading="lazy" alt="download on the app store" />
            </a>
          </div>
        </div>
        <figure className="app-banner" data-animate="fade-left" data-delay="200">
          <img src="/assets/images/app-banner.png" alt="app banner" />
        </figure>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    products: ['Spot', 'Inverse Perpetual', 'USDT Perpetual', 'Exchange', 'Launchpad', 'Binance Pay'],
    services: ['Buy Crypto', 'Markets', 'Tranding Fee', 'Affiliate Program', 'Referral Program', 'API'],
    support: ['Bybit Learn', 'Help Center', 'User Feedback', 'Submit a request', 'API Documentation', 'Trading Rules'],
    about: ['About Bybit', 'Authenticity Check', 'Careers', 'Business Contacts', 'Blog']
  };

  return ( 
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="/" className="logo">
              <img src="/assets/images/logo.svg" width="50" height="50" alt="TradeX logo" />
              TradeX
            </a>
            <h2 className="footer-title">Let's talk! 🤙</h2>
            <a href="tel:+919327233815" className="footer-contact-link">+91 9327233815</a>
            <a href="mailto:rudra.cict22@gmail.com" className="footer-contact-link">rudra.cict22.com</a>
            <address className="footer-contact-link">
              At & Post Gandhinagar, Gujarat, India
            </address>
          </div>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Products</p>
            </li>
            {footerLinks.products.map((link, index) => (
              <li key={`product-${index}`}>
                <a href="/" className="footer-link">{link}</a>
              </li>
            ))}
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Services</p>
            </li>
            {footerLinks.services.map((link, index) => (
              <li key={`service-${index}`}>
                <a href="/" className="footer-link">{link}</a>
              </li>
            ))}
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Support</p>
            </li>
            {footerLinks.support.map((link, index) => (
              <li key={`support-${index}`}>
                <a href="/" className="footer-link">{link}</a>
              </li>
            ))}
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">About Us</p>
            </li>
            {footerLinks.about.map((link, index) => (
              <li key={`about-${index}`}>
                <a href="/" className="footer-link">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2025 TradeX All Rights Reserved by <a href="/" className="copyright-link">Rudra Chudasama</a>
          </p>

          <ul className="social-list">
            <li>
              <a href="/" className="social-link">
                <Facebook />
              </a>
            </li>
            <li>
              <a href="/" className="social-link">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="/" className="social-link">
                <Instagram />
              </a>
            </li>
            <li>
              <a href="/" className="social-link">
                <Linkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export {
  HeroSection,
  TrendSection,
  MarketSection,
  InstructionSection,
  AboutSection,
  AppSection,
  Footer
};

export default App;
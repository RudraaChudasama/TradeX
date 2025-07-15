import React, { useState, useEffect } from 'react';
import { Star, Search, TrendingUp, TrendingDown, ChevronDown, Percent, DollarSign, BarChart3 } from 'lucide-react';
import './Markets.css'; // Import the custom CSS file

function Markets() {
  const [markets, setMarkets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all'); // Add this line
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('spot');
  const [sortConfig, setSortConfig] = useState({ key: 'volume', direction: 'desc' });
  const [priceUpdates, setPriceUpdates] = useState({});
  const [wsData, setWsData] = useState({});
  const [socket, setSocket] = useState(null);

  const WEBSOCKET_URL = 'wss://stream.binance.com:9443/ws';
  const BINANCE_API = 'https://api.binance.com/api/v3';

  const categories = [
    { id: 'spot', label: 'Spot Markets' },
    { id: 'futures', label: 'Futures' },
    { id: 'new', label: 'New Listings' }
  ];

  const filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'gainers', label: 'Top Gainers', icon: TrendingUp },
    { id: 'losers', label: 'Top Losers', icon: TrendingDown },
    { id: '24h', label: '24H Volume', icon: BarChart3 }
  ];

  // Function to format coin name
  const formatCoinName = (name) => {
    // Remove /USDT and format
    return name.replace('/USDT', '');
  };

  // Function to format large numbers
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  useEffect(() => {
    // Initial market data fetch
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BINANCE_API}/ticker/24hr`);
        const data = await response.json();
        
        const filteredData = data
          .filter(item => item.symbol.endsWith('USDT'))
          .slice(0, 20)
          .map(item => ({
            id: item.symbol,
            name: `${item.symbol.replace('USDT', '')}/USDT`,
            symbol: item.symbol.replace('USDT', ''),
            price: parseFloat(item.lastPrice).toFixed(2),
            change: parseFloat(item.priceChangePercent).toFixed(2),
            high24h: parseFloat(item.highPrice).toFixed(2),
            low24h: parseFloat(item.lowPrice).toFixed(2),
            volume: formatNumber(parseFloat(item.volume)),
            marketCap: 'N/A' // Binance doesn't provide market cap
          }));

        setMarkets(filteredData);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    let ws = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connectWebSocket = () => {
      ws = new WebSocket('wss://stream.binance.com:9443/ws');

      ws.onopen = () => {
        console.log('WebSocket Connected');
        reconnectAttempts = 0; // Reset attempts on successful connection
        const symbols = markets.map(m => m.id.toLowerCase());
        const subscribeMsg = {
          method: 'SUBSCRIBE',
          params: symbols.map(symbol => `${symbol}@ticker`),
          id: 1
        };
        ws.send(JSON.stringify(subscribeMsg));
      };

      ws.onclose = () => {
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log('WebSocket disconnected. Reconnecting...');
          reconnectAttempts++;
          setTimeout(connectWebSocket, 3000); // Retry after 3 seconds
        }
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.e === '24hrTicker') {
          setWsData(prev => ({
            ...prev,
            [data.s]: {
              price: parseFloat(data.c).toFixed(2),
              change: parseFloat(data.P).toFixed(2),
              high: parseFloat(data.h).toFixed(2),
              low: parseFloat(data.l).toFixed(2),
              volume: formatNumber(parseFloat(data.v))
            }
          }));

          // Update price animations
          setPriceUpdates(prev => ({
            ...prev,
            [data.s]: parseFloat(data.p) >= 0 ? 'up' : 'down'
          }));

          // Clear animation after 1 second
          setTimeout(() => {
            setPriceUpdates(prev => {
              const newUpdates = { ...prev };
              delete newUpdates[data.s];
              return newUpdates;
            });
          }, 1000);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [markets]);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getFilteredMarkets = () => {
    let filtered = [...markets];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(market => 
        market.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory === 'spot') {
      filtered = filtered.filter(market => market.name.includes('/USDT'));
    }

    // Apply main filters
    switch (activeFilter) {
      case 'favorites':
        filtered = filtered.filter(market => favorites[market.id]);
        break;
      case 'gainers':
        filtered = filtered.filter(market => parseFloat(market.change) > 0)
          .sort((a, b) => parseFloat(b.change) - parseFloat(a.change));
        break;
      case 'losers':
        filtered = filtered.filter(market => parseFloat(market.change) < 0)
          .sort((a, b) => parseFloat(a.change) - parseFloat(b.change));
        break;
      case '24h':
        filtered = filtered.sort((a, b) => {
          const volumeA = parseFloat(a.volume.replace(/[^0-9.-]+/g, ''));
          const volumeB = parseFloat(b.volume.replace(/[^0-9.-]+/g, ''));
          return volumeB - volumeA;
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredMarkets = getFilteredMarkets();

  // Update the filter handling function
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setFilter(filterId);
  };

  // Update your market row rendering to use WebSocket data
  const renderMarketRow = (market) => {
    const liveData = wsData[market.id] || {};
    
    return (
      <div key={market.id} className="market-row">
        {/* Keep existing favorite star cell */}
        <div className="table-cell">
          <Star 
            className={`star-favorite ${favorites[market.id] ? 'active' : ''}`}
            onClick={() => toggleFavorite(market.id)}
            size={16}
          />
        </div>
        
        {/* Name cell remains unchanged */}
        <div className="table-cell">
          <div className="coin-info">
            <span className="coin-symbol">{market.name.replace('/USDT', '')}</span>
            <span className="coin-name">{market.symbol}</span>
          </div>
        </div>

        {/* Price cell with live updates */}
        <div className="table-cell">
          <span className={`price-value ${priceUpdates[market.id] ? `flash-${priceUpdates[market.id]}` : ''}`}>
            ${liveData.price || market.price}
          </span>
        </div>

        {/* Change cell with live updates */}
        <div className="table-cell">
          <span className={`change-value ${(liveData.change || market.change) >= 0 ? 'positive' : 'negative'}`}>
            {liveData.change || market.change}%
          </span>
        </div>

        {/* High/Low cells with live updates */}
        <div className="table-cell high-low-cell">${liveData.high || market.high24h}</div>
        <div className="table-cell high-low-cell">${liveData.low || market.low24h}</div>
        <div className="table-cell volume-cell">${liveData.volume || market.volume}</div>
        <div className="table-cell market-cap-cell">${market.marketCap}</div>

        {/* Keep existing trade button cell */}
        <div className="table-cell">
          <button className="trade-button">Trade</button>
        </div>
      </div>
    );
  };

  return (
    <div className="markets-container">
      <div className="markets-content">
        <div className="markets-filters-wrapper">
          <div className="categories-row">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="filters-row">
            <div className="filters-group">
              {filters.map(filter => (
                <button 
                  key={filter.id}
                  className={`filter-button ${activeFilter === filter.id ? 
                    filter.id === 'gainers' ? 'active-green' : 
                    filter.id === 'losers' ? 'active-red' : 
                    'active' : ''}`}
                  onClick={() => handleFilterChange(filter.id)}
                >
                  {filter.icon && <filter.icon size={16} />}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>

            <div className="search-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search coin"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="markets-table">
          <div className="markets-table-header">
            <div className="table-header-cell"></div>
            <div className="table-header-cell">Name</div>
            <div className="table-header-cell">Price</div>
            <div className="table-header-cell">24h Change</div>
            <div className="table-header-cell high-low-cell">24h High</div>
            <div className="table-header-cell high-low-cell">24h Low</div>
            <div className="table-header-cell volume-cell">Volume</div>
            <div className="table-header-cell market-cap-cell">Market Cap</div>
            <div className="table-header-cell"></div>
          </div>

          {filteredMarkets.map(market => renderMarketRow(market))}
        </div>
      </div>
    </div>
  );
}

export default Markets;
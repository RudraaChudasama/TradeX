class CryptoWebSocket {
  constructor(onMessageCallback) {
    this.ws = null;
    this.onMessageCallback = onMessageCallback;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    this.ws = new WebSocket('wss://stream.binance.com:9443/ws');

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.reconnectAttempts = 0;
      
      // Subscribe to multiple symbol streams
      const subscribeMsg = {
        method: 'SUBSCRIBE',
        params: [
          'btcusdt@ticker',
          'ethusdt@ticker',
          'bnbusdt@ticker',
          // Add more pairs as needed
        ],
        id: 1
      };
      
      this.ws.send(JSON.stringify(subscribeMsg));
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      setTimeout(() => this.connect(), 5000);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default CryptoWebSocket;
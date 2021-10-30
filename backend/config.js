module.exports = {
  symbols: [
    // "BCHUSDT",
    "AXSUSDT",
    "ENJUSDT",
    "BALUSDT",
    "LUNAUSDT",
    // "LINKUSDT",
    "VETUSDT",
    // "ADAUSDT",
    "ETHUSDT",
    "SRMUSDT",
    // "ZILUSDT",
    "MATICUSDT",
    "ATOMUSDT",
    "AVAXUSDT",
    // "EGLDUSDT",
    "DOTUSDT",
    // "AAVEUSDT",
    "GRTUSDT",
    "BTCUSDT",
    "BNBUSDT",
    "REEFUSDT",
    "SOLUSDT",
    // "ALPHAUSDT",
    "SUSHIUSDT",
    // "COMPUSDT",
    // "CELRUSDT",
    "HOTUSDT",
    // "DENTUSDT",
    "ONTUSDT"
  ],
  urls: {
    "24": "https://api.binance.com/api/v3/ticker/24hr",
    pair: "https://api.binance.com/api/v3/ticker/price?symbol={pair}",
    candles:
      "https://api.binance.com/api/v3/klines?symbol={pair}&interval={interval}"
  },
  intervals: ["1m", "5m", "15m", "1h", "4h", "1d", "1w"],
  port: 5000,
  refresh: 8989
};

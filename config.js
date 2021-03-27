module.exports = {
  symbols: [
    "AXS",
    "ENJ",
    "SAND",
    "YFI",
    "BAL",
    "LUNA",
    "LINK",
    "VET",
    "ADA",
    "BAND",
    "ETH",
    "SRM",
    "ZIL",
    "MATIC",
    "ATOM",
    "AVAX",
    "EGLD",
    "DOT",
    "AAVE",
    "GRT",
    "BTC",
    "BNB",
    "REEF",
    "SOL",
    "RUNE",
    "ALPHA",
    "SUSHI",
    "RSR",
    "THETA"
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

# Market Watch

Quick view of selected coins. Instead of seeing the 24 hours % change alone, it displays:
  - 2 days,
  - 24 hours
  - 8,4,2 15 min candles % change
  - 8,4,2 15 min volume

**Candle change** Candle open vs last price   
**Volume change** Frame average vs 2 days average

# Requirements

  - Node

# Install
```
npm install
```

# Configure your coins
Open config.js and add symbols

# Use
```
node index
```
Browse to: *localhost:5000/all*

## Notes

This is the very first version, it requires no API keys as it uses only public end points.

To move to sockets, front end with react and add more indicators that help target well performing coins.

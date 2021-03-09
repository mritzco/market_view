// console.log(binance);
const bin = require("./candles");
const ind = require("./indicators");


async function main(symbol, interval = "15m") {
  const pair = `${symbol}USDT`;
  const options = { limit: 192 }; // 2 days
  // console.log('[Pair]', pair , '------------------------------');
  // All futures
  // console.info(await binance.futuresPrices());
  const candles = await bin.candles(pair, interval, options);
  // const parsed = bin.addKeys(candles);
  // console.info(parsed.pop(), parsed.shift());
  const stats = bin.stats(candles);

  const inverse = bin.inverse(candles);
  const indicators = {
    // sma3: await ind.sma(inverse.close, 3),
    // sma72: await ind.sma(inverse.close, 72),
    changeall: ind.change(inverse.close, inverse.close.length),
    change24h: ind.change(inverse.close, 24 * 4),
    change8c: ind.change(inverse.close, 8),
    change4c: ind.change(inverse.close, 4),
    change2c: ind.change(inverse.close, 2),
    vol8c: ind.avgcompare(inverse.volume, 8),
    vol4c: ind.avgcompare(inverse.volume, 4),
    vol2c: ind.avgcompare(inverse.volume, 2)
  };

  // return { candles, stats, inverse, indicators };
  return { symbol, stats, indicators };
}
async function get(symbols) {
  const promises = symbols.sort().map(async item => await main(item));
  const res = await Promise.all(promises);
  return res;
}
// main("AAVE");

module.exports = { get };
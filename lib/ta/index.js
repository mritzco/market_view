// console.log(binance);
const bin = require("./candles");
const ind = require("./indicators");
const PromiseExt = require("./../promisechunk");


async function main(symbol, interval = "15m") {
  const pair = symbol;
  const options = { limit: 500 }; // 2 days
  // console.log("[Pair]", pair, "------------------------------");
  // All futures
  let time = await bin.time();
  const candles = await bin.candles(pair, interval, options);
  if (!candles) return;
  // console.log("[%s] time", pair);
  const parsed = bin.addKeys([candles[candles.length - 1]]).pop();
  // console.log("[%s] parsed", pair, parsed);
  // console.log("[candle] %s", symbol, parsed);
  // console.info(parsed.pop(), parsed.shift());
  if (!Array.isArray(candles)) {
    console.log("[symbol] %s is null", symbol);
    return null;
  }
  const stats = bin.stats(candles);
// console.log('[stats]', stats);
  const inverse = bin.inverse(candles);

  const data_len = inverse.close.length - 1; // Might be less than requested

  const indicators = {
    // sma3: await ind.sma(inverse.close, 3),
    // sma72: await ind.sma(inverse.close, 72),
    changeall: ind.change(inverse.close, data_len),
    change24h: ind.change(inverse.close, 24 * 4),
    change8c: ind.change(inverse.close, 8),
    change4c: ind.change(inverse.close, 4),
    change2c: ind.change(inverse.close, 2),
    change1c: ind.changeJSON(parsed.open, parsed.close),

    posall: ind.relPos(inverse, data_len, symbol),
    pos24h: ind.relPos(inverse, 24 * 4, symbol),
    pos4h: ind.relPos(inverse, 4 * 4, symbol),
    pos8c: ind.relPos(inverse, 8, symbol),
    pos4c: ind.relPos(inverse, 4, symbol),


    vol8c: ind.avgcompare(inverse.volume, 8),
    vol4c: ind.avgcompare(inverse.volume, 4),
    vol2c: ind.avgcompare(inverse.volume, 2),
    vol1c: ind.vol1(inverse.volume, parsed, time)
  };

  // return { candles, stats, inverse, indicators };
  return { symbol, stats, indicators };
}
async function get(symbols) {
  // const promises = symbols.sort().map(async item => await main(item));
  const res = await PromiseExt.chunks(symbols.sort(), main, 30);
  return res.filter(i => i !== null);
}

module.exports = { get, prices: bin.prices };

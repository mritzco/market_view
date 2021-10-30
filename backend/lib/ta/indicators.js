var tulind = require("tulind");
const util = require("util");

function sma(data, period, callback) {
  tulind.indicators.sma.indicator([data], [period], callback);
}
function list() {
  return tulind.indicators;
}

function change(data, candles) {
  const open = data[data.length - (candles + 1)];
  const close = data[data.length - 1];
  return changeJSON(open, close);
}

function changeJSON(open, close) {
  return {
    open,
    close,
    change: ((close / open - 1) * 100).toFixed(2)
  };
}
const { jStat } = require("jstat");

function avgcompare(numbers, candles) {
  // const numbers = data.map(i => i));
  const avg = jStat(numbers).mean();
  const sample = jStat(numbers.slice(candles * -1)).mean();
  return {
    avg,
    sample,
    change: ((sample / avg - 1) * 100).toFixed(2)
  };
}

function vol1(numbers, parsed, time) {
  // const numbers = data.map(i => Number(i));
  const avg = jStat(numbers).mean();
  const sample = parsed.volume;
  const ratio = (time - parsed.time.open) / 900000; // ml

  const p_avg = avg * ratio; // avg in that time

  return {
    avg,
    sample,
    change: ((sample / p_avg - 1) * 100).toFixed(2)
  };
}

function relPos(data, candles, sym='') {
  // console.log("[high]", data.high.slice(candles * -1));
  // console.log("[low]", data.low.slice(candles * -1));
  const min = jStat(data.low.slice(candles * -1)).min();
  const max = jStat(data.high.slice(candles * -1)).max();
  const price = data.close.slice(-1).pop();
  const pos = ((price - min) * 100) / (max - min);
  // console.log("[%s-%s]", sym,candles,  { max, min, price, pos, num: Math.round(pos) }, data.high.slice(candles * -1));
  return Math.round(pos);
}

module.exports = {
  list,
  sma: util.promisify(sma),
  change,
  avgcompare,
  changeJSON,
  vol1,
  relPos
};

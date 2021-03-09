var tulind = require("tulind");
const util = require("util");

function sma(data, period, callback) {
  tulind.indicators.sma.indicator([data], [period], callback);
}
function list() {
  return tulind.indicators;
}

function change(data, candles) {
  const open = data[data.length - candles];
  const close = data[data.length - 1];
  return {
    open,
    close,
    change: ((close / open - 1) * 100).toFixed(2)
  };
}
const { jStat } = require("jstat");
function avgcompare(data, candles) {
  const numbers = data.map(i => Number(i));
  const avg = jStat(numbers).mean();
  const sample = jStat(numbers.slice(candles * -1)).mean();
  return {
    avg,
    sample,
    change: ((sample / avg - 1) * 100).toFixed(2)
  };
}

module.exports = {
  list,
  sma: util.promisify(sma),
  change,
  avgcompare
};

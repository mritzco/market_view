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
  return changeJS(open, close);
}

function changeJS(open, close) {
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

function avg1(data, candles, parsed, time) {
  const r = avgcompare(data, candles);
  const ellapsed = time - parsed.time.open; // ml

  const p_avg = (r.avg * ellapsed) / 900000; // 15min ml
  console.log("[avg1] min: ", ellapsed, r.avg, p_avg);
  r.changed = (r.sample / p_avg - 1) * 100;
  return r;
}

module.exports = {
  list,
  sma: util.promisify(sma),
  change,
  avgcompare,
  changeJS,
  avg1
};

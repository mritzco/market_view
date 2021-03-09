const Binance = require("node-binance-api");
const binance = new Binance();
const { jStat } = require("jstat");

async function candles(pair, interval, options) {
  return await binance.futuresCandles(pair, interval, options);
}
/** Returns the inverted matrix with names for easy vector manipulation */
function inverse(data) {
  return {
    from: data.map(i => i[0]),
    open: data.map(i => i[1]),
    high: data.map(i => i[2]),
    low: data.map(i => i[3]),
    close: data.map(i => i[4]),
    volume: data.map(i => i[5]),
    trades: data.map(i => i[8])
  };
}
const moment = require("moment");
function addKeys(data) {
  return data.map(i => {
    return {
      time: { open: i[0], close: i[6] },
      human: {
        open: new Date(i[0]).toLocaleString(),
        close: new Date(i[6]).toLocaleString()
      },
      open: i[1],
      high: i[2],
      low: i[3],
      close: i[4],
      volume: i[5],
      // quoteassetvolume: i[7],
      trades: i[8]
      // takerbuybase: i[9],
      // takerbuyquote: i[10]
    };
  });
}

function stats(m) {
  return {
    low: jStat(m.map(i => i[3])).min(),
    high: jStat(m.map(i => i[2])).max(),
    open: m[0][1],
    close: m[m.length - 1][4],

    from: m[0][0],
    until: m[m.length - 1][6],
    human: {
      from: new Date(m[0][0]).toLocaleString(),
      until: new Date(m[m.length - 1][6]).toLocaleString(),
      window: moment.duration(m[m.length - 1][6] - m[0][0]).humanize()
    },
    price: stats1(m, 4),
    volume: stats1(m, 5),
    trades: stats1(m, 8)
    // change: stats(m_change),
  };
}

function stats1(m, idx, frames = 5) {
  const data = jStat(m.map(i => Number(i[idx])));
  // console.log("[status.%s] ", idx, data);
  // const trend = m.map(i => Number(i[idx]))
  const dev = data.deviation().slice(frames * -1);
  const stdev = data.stdev();
  return {
    mean: data.mean(),
    // median: data.median(),
    stdev: stdev,
    // variance: data.variance(),
    // meandev: data.meandev(),
    range: data.range(),
    deviation_mean: jStat(dev.map(i => Math.abs(i) / stdev)).mean()
    // {
    // raw: dev,
    // size: dev.map(i => i / stdev),
    // }
  };
}

function significant(data, threshold = 1.25) {
  const { low, high, price, volume, trades } = data;
  const isUp = data.close > data.open; // Verify last 5
  // const isLarge = data.variance > data.stdev * 2;
  return (
    price.deviation.mean > threshold &&
    volume.deviation.mean > threshold &&
    trades.deviation.mean > threshold
  );
  console.log(nearUp);
}

module.exports = { candles, stats, addKeys, significant, inverse };

// handlers/web.js
const bin = require("./../ta");
const topsymbols = ["BTC", "ETH"];
const { symbols } = require("config");
const sym_ignore = /(_\d+|BUSD|ZRX|ZIL|ZEN|ZEC|YFII)/;

async function all(req, res) {
  const prices = await bin.prices();
  const sym = Object.keys(prices)
    .filter(i => !i.match(sym_ignore))
    .map(i => i.replace("USDT", ""))
    .sort();
    // console.log(sym);
    // return;
  const info = await bin.get(sym);
  return displayTable(res, info);
}
async function user(req, res) {
  const info = await bin.get(symbols);
  return displayTable(res, info);
}
function displayTable(res, info) {
  res.render("table", {
    title: "Symbols",
    time: new Date().toTimeString(),
    top: info.filter(i => topsymbols.indexOf(i.symbol) !== -1),
    info: info.filter(i => topsymbols.indexOf(i.symbol) === -1)
  });
}

module.exports = { all, user };

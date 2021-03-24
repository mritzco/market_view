const express = require("express");
const router = express.Router();

const bin = require("./../ta");
const { symbols } = require("config");

const topsymbols = ["BTC", "ETH"];

router.get("/all", async (req, res) => {
  const info = await bin.get(symbols);
  // console.log(info.filter(i => topsymbols.indexOf(i.symbol) !== -1))

  res.render("table", {
    title: "Symbols",
    time: new Date().toTimeString(),
    top: info.filter(i => topsymbols.indexOf(i.symbol) !== -1),
    info: info.filter(i => topsymbols.indexOf(i.symbol) === -1)
  });
});

router.get("/:symbol", async (req, res) => {
  if (req.params.symbol === "favicon.ico") return res.sendStatus(400);
  // res.send(req.params.symbol);
  const info = await bin.get([req.params.symbol]);
  // res.json(info[0])
  // console.log('info', info);
  res.render("symbol", {
    title: req.params.symbol,
    info
  });
});

module.exports = router;

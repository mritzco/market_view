const express = require("express");
const router = express.Router();

const bin = require("./../ta");
const { symbols } = require("config");

router.get("/", async (req, res) => {
  const info = await bin.get(symbols);
  res.json(info);
});

module.exports = router;

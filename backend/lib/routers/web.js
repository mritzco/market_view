const express = require("express");
const router = express.Router();




const handlers = require("./../handlers/web");

router.get("/all", handlers.all);
router.get("/user", handlers.user);

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

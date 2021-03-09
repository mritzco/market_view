/**
 * Required modules
 * @type {class}
 */
const path = require("path"),
  config = require("config.js"),
  // routes = require("routes.js"),
  express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  app = express();

const bin = require("./lib");
const { symbols } = require("config");
const consolidate = require("consolidate");

app.use(helmet());
app.use(cors());
app.use(express.static("public"));

// assign the swig engine to .html files
app.engine("html", consolidate.ejs);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
/**
 * Serves tickets
 * @type {[type]}
 */
app.listen(config.port, function() {
  console.log("Serving", config.port);
});

app.get("/", async (req, res) => {
  const info = await bin.get(symbols);

  res.json(info);
});

app.get("/table", async (req, res) => {
  const info = await bin.get(symbols);
  res.render("table", {
    title: "Symbols",
    info
  });
});
app.get("/:symbol", async (req, res) => {
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

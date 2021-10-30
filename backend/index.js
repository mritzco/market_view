/**
 * Required modules
 * @type {class}
 */
const path = require("path"),
  config = require("config.js"),
  express = require("express"),
  helmet = require("helmet"),
  cors = require("cors"),
  app = express();

const consolidate = require("consolidate");

const web = require('./lib/routers/web')
const api = require('./lib/routers/api')

app.use(helmet());
app.use(cors());
// app.use(
// session({
//     // secret: "process.env.SESSION_SECRET!",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { sameSite: 'strict' },
//   }),
// );
app.use(express.static("public"));

// assign the swig engine to .html files
app.engine("html", consolidate.ejs);
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.use('/api', api)
app.use('/', web)

/**
 * Serves tickets
 * @type {[type]}
 */
app.listen(config.port, function() {
  console.log("Serving", config.port);
});

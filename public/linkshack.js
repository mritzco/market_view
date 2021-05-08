function linktop(rows) {
  console.log(rows);
  const link =
    "https://cryptowatch.net/?" +
    rows.map(s => `chart=BINANCE:${s.toUpperCase()}PERP`).join("&");
  document.getElementById("chartslink").href = link;
  document.getElementById("chartslink").target = "_blank";
}

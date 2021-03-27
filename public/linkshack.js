function linktop(rows) {
  // console.log(rows);
  const link =
    "https://cryptowatch.net/?chart=BINANCE:BTCUSDTPERP&chart=BINANCE:ETHUSDTPERP&" +
    rows.map(s => `chart=BINANCE:${s.toUpperCase()}USDTPERP`).join("&");
  document.getElementById("chartslink").href = link;
  document.getElementById("chartslink").target = "_blank";
}

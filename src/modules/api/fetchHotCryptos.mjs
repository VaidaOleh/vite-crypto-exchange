export default async function loadHotCryptos() {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22,%22BNBUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22%5D"
      );
      const data = await response.json();
  
      let btcPrice = Math.floor(
        data.find((coin) => coin.symbol === "BTCUSDT").price
      );
      let formattedBTCPrice = new Intl.NumberFormat("en-US").format(btcPrice);
  
      let bnbPrice = Math.floor(
        data.find((coin) => coin.symbol === "BNBUSDT").price
      );
      let formattedBNBPrice = new Intl.NumberFormat("en-US").format(bnbPrice);
  
      let ethPrice = Math.floor(
        data.find((coin) => coin.symbol === "ETHUSDT").price
      );
      let formattedETHPrice = new Intl.NumberFormat("en-US").format(ethPrice);
  
      let solPrice = Math.floor(
        data.find((coin) => coin.symbol === "SOLUSDT").price
      );
      let formattedSOLPrice = new Intl.NumberFormat("en-US").format(solPrice);
  
      document.getElementById("btc-price").textContent = `$${formattedBTCPrice}`;
      document.getElementById("bnb-price").textContent = `$${formattedBNBPrice}`;
      document.getElementById("eth-price").textContent = `$${formattedETHPrice}`;
      document.getElementById("sol-price").textContent = `$${formattedSOLPrice}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
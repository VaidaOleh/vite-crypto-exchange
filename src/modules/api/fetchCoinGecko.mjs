export async function loadTopCryptos(coinIcons) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
    );
    const coins = await response.json();
    const fromSelect = document.getElementById("fromCoin");
    const toSelect = document.getElementById("toCoin");

    coins.forEach((coin) => {
      coinIcons[coin.id] = coin.image;

      const optionFrom = document.createElement("option");
      optionFrom.value = coin.id;
      optionFrom.textContent = `${coin.symbol.toUpperCase()}`;
      fromSelect.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = coin.id;
      optionTo.textContent = `${coin.symbol.toUpperCase()}`;
      toSelect.appendChild(optionTo);
    });
  } catch (error) {
    console.error("Помилка завантаження криптовалют:", error);
  }
}

import { loadTopCryptos } from "../modules/api/fetchCoinGecko.mjs";
import { updateIcon } from "../modules/utils/domUtils.mjs";

// Об'єкт для збереження зображень криптовалют
const coinIcons = {};

async function convertCrypto() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCoin = document.getElementById("fromCoin").value;
  const toCoin = document.getElementById("toCoin").value;
  const resultDiv = document.getElementById("result");
  const commisionDiv = document.getElementById("com");

  if (isNaN(amount) || amount <= 0 || !fromCoin || !toCoin) {
    resultDiv.textContent = "";
    return;
  }

  try {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin},${toCoin}&vs_currencies=usd`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const fromPrice = data[fromCoin].usd;
    const toPrice = data[toCoin].usd;
    const convertedAmount = (amount * fromPrice) / toPrice;
    const totalUSD = convertedAmount * toPrice;
    const commision = Math.floor(amount * 0.0025 * 100000) / 100000;
    const commisionUSD = Math.floor(commision * fromPrice * 100000) / 100000;

    resultDiv.textContent = `= ${convertedAmount.toFixed(6)} ${toCoin.toUpperCase()} ($${totalUSD.toFixed(2)})`;
    commisionDiv.textContent = `Expected commision ${commision} ${fromCoin.toUpperCase()} ($${commisionUSD} )`
  } catch (error) {
    resultDiv.textContent = "Сталася помилка. Спробуйте пізніше.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadTopCryptos(coinIcons);

  // Встановлюємо перший варіант у випадаючих списках (якщо є дані)
  const fromSelect = document.getElementById("fromCoin");
  const toSelect = document.getElementById("toCoin");

  if (fromSelect.options.length > 1) fromSelect.selectedIndex = 1;
  if (toSelect.options.length > 1) toSelect.selectedIndex = 2;

  // Оновлюємо іконки одразу після завантаження списку
  updateIcon("fromCoin", "fromIcon", coinIcons);
  updateIcon("toCoin", "toIcon", coinIcons);
  
  // Виконуємо конвертацію для стартових значень
  convertCrypto();

  document.getElementById("amount").addEventListener("input", convertCrypto);
  fromSelect.addEventListener("change", () => {
    updateIcon("fromCoin", "fromIcon", coinIcons);
    convertCrypto();
  });
  toSelect.addEventListener("change", () => {
    updateIcon("toCoin", "toIcon", coinIcons);
    convertCrypto();
  });
});

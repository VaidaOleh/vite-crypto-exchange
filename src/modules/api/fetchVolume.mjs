export default async function loadTotalVolume() {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/global");
      if (!response.ok) {
        throw new Error(`Помилка HTTP: ${response.status}`);
      }
      const data = await response.json();
      const totalVolume = data.data.total_volume.usd;
      const formattedVolume = totalVolume.toLocaleString("en-US");
      const volumeP = document.getElementById("volume");
      if (volumeP) {
        volumeP.textContent = '$' + formattedVolume;
      } else {
        console.error('Елемент з id "" не знайдено.');
      }
    } catch (error) {
      console.error("Помилка отримання даних:", error);
    }
  }
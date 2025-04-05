import loadTotalVolume from "../modules/api/fetchVolume.mjs";
import loadHotCryptos from "../modules/api/fetchHotCryptos.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadTotalVolume();
    await loadHotCryptos();
});
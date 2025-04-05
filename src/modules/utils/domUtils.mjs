export function updateIcon(selectId, imgId, coinIcons) {
    const selectElem = document.getElementById(selectId);
    const imgElem = document.getElementById(imgId);
    const coin = selectElem.value;
    imgElem.src = coinIcons[coin] || "";
  }
  
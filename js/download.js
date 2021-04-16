const downloadGifs = async (ev) => {
    const downloadUrl = `https://media.giphy.com/media/${ev}/giphy.gif`;
    const fetchedGif = fetch(downloadUrl);
    const blobGifos = (await fetchedGif).blob();
    const urlGifos = URL.createObjectURL(await blobGifos);
    const titleGif = document.querySelector('.imgnewgifos').alt;
    const saveGifImg = document.createElement("a");
    saveGifImg.href = urlGifos;
    saveGifImg.download = `${titleGif}.gif`;
    saveGifImg.style = 'display: "none"';
    document.body.appendChild(saveGifImg);
    saveGifImg.click();
    document.body.removeChild(saveGifImg);
};

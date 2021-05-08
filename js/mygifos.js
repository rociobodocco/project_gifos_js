document.addEventListener('DOMContentLoaded', () => {
    const localMyGifs = JSON.parse(localStorage.getItem('myGifos'));
    if (localMyGifs.length >= 1) {
        document.querySelector('.emptyMyGifosSection').style.display = 'none';

        const gifosElements = (mygifos) => {
            for (let i = 0; i < localMyGifs.length; i++) {
                const cardMyGifos = document.createElement("div");
                cardMyGifos.classList.add("container-img-mygifos");
                cardMyGifos.innerHTML = `
                    <img class="imgmygifos" src="${mygifos[i].url}" alt="myGifo">
                    <div class="containerDetails">
                        <div class="content-overlay"></div>
                        <div class="content-details fadeIn-top fadeIn-left">
                            <div class="hoverIcons">
                            <a href="#"><i data-id="${mygifos[i].id}" <i class="far fa-trash-alt btnDeleteMyGifo"></i></a>
                            <a href="#" class="btndownload"><i class="fas fa-download"></i></a>
                            <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                            </div>
                            <p class="textCardimg"></p>
                            <h6 class="titleCardimg"></h6>
                        </div>
                        </div>
                    </div>`;
                containerMyGifos.appendChild(cardMyGifos);

                // Modal expand Fav
                const showModalExpandMyGifsMobile = () => {
                    const modal = document.createElement('div');
                    modal.classList.add('show');
                    modal.innerHTML = `
                        <i class="fas fa-times close-btn-modalExpand"></i>
                        <div class="img-expand"> 
                        <img class="modalImg"  src="${mygifos[i].url}" alt="myGifo">
                        </div>
                        <div class="constainerIcons">
                            <a href="#"><i data-id="${mygifos[i].id}" <i class="far fa-trash-alt btnDeleteMyGifo"></i></a>
                            <a href="#"><i data-id="${mygifos[i].id}" class="fas fa-download btndownload"></i></a>
                        </div> 
                        <p class="textCardimg"></p>
                        <h6 class="titleCardimg"></h6>`;


                    document.querySelector('.misgifosSection').appendChild(modal);

                    modal.querySelector('.close-btn-modalExpand').addEventListener("click", () => {
                        modal.style.display = "none";
                    });

                    // Remove My Gifos Modal
                    modal.querySelector('.btnDeleteMyGifo').addEventListener("click", deleteMyGifosHandler);

                    // Download
                    const downloadGifs = async () => {
                        const downloadUrl = `https://media.giphy.com/media/${mygifos[i].id}/giphy.gif`;
                        console.log(downloadUrl)
                        const fetchedGif = fetch(downloadUrl);
                        const blobGifos = (await fetchedGif).blob();
                        const urlGifos = URL.createObjectURL(await blobGifos);
                        const titleGif = document.querySelector('.modalImg').alt;
                        const saveGifImg = document.createElement("a");
                        saveGifImg.href = urlGifos;
                        saveGifImg.download = `${titleGif}.gif`;
                        saveGifImg.style = 'display: "none"';
                        document.body.appendChild(saveGifImg);
                        saveGifImg.click();
                        document.body.removeChild(saveGifImg);
                    };

                    modal.querySelector('.btndownload').addEventListener("click", downloadGifs);
                };

                // Modal mobile and desktop 
                if (window.matchMedia("(min-width: 768px)").matches) {
                    // Modal Expand
                    const expandMyGifs = cardMyGifos.querySelector('.btnModalExpand');
                    // expand.addEventListener("touchstart", showModalExpand);
                    // expand.addEventListener("touchend", showModalExpand);
                    expandMyGifs.addEventListener("click", showModalExpandMyGifsMobile);
                    expandMyGifs.imagegif = mygifos[i].url;

                    const imageMyGifOnclick = cardMyGifos.querySelector('img');
                    // imageGifOnclick.addEventListener("touchstart", showModalExpand);
                    // imageGifOnclick.addEventListener("touchend", showModalExpand);
                    imageMyGifOnclick.addEventListener("click", showModalExpandMyGifsMobile);
                    imageMyGifOnclick.imagegif = mygifos[i].url;
                } else {
                    // Modal Expand
                    const expandMyGifs = cardMyGifos.querySelector('.btnModalExpand');
                    // expand.addEventListener("touchstart", showModalExpand);
                    // expand.addEventListener("touchend", showModalExpand);
                    expandMyGifs.addEventListener("click", showModalExpandMyGifsMobile);
                    expandMyGifs.imagegif = mygifos[i].url;

                    const imageMyGifOnclick = cardMyGifos.querySelector('img');
                    // imageGifOnclick.addEventListener("touchstart", showModalExpand);
                    // imageGifOnclick.addEventListener("touchend", showModalExpand);
                    imageMyGifOnclick.addEventListener("click", showModalExpandMyGifsMobile);
                    imageMyGifOnclick.imagegif = mygifos[i].url;
                };

                // Remove My Gifos
                cardMyGifos.querySelector('.btnDeleteMyGifo').addEventListener("click", deleteMyGifosHandler);

                // Download
                const downloadMyGifs = async (ev) => {
                    const downloadUrlMyGifos = `${mygifos[i].url}`;
                    console.log(downloadUrlMyGifos)
                    const fetchedGif = fetch(downloadUrlMyGifos);
                    const blobGifos = (await fetchedGif).blob();
                    const urlGifos = URL.createObjectURL(await blobGifos);
                    const titleGif = document.querySelector('.imgmygifos').alt;
                    const saveGifImg = document.createElement("a");
                    saveGifImg.href = urlGifos;
                    console.log(urlGifos)
                    saveGifImg.download = `${titleGif}.gif`;
                    saveGifImg.style = 'display: "none"';
                    document.body.appendChild(saveGifImg);
                    saveGifImg.click();
                    document.body.removeChild(saveGifImg);
                };

                cardMyGifos.querySelector('.btndownload').addEventListener("click", downloadMyGifs);
            };

        };
        gifosElements(localMyGifs)

    } else {
        document.querySelector('.emptyMyGifosSection').style.display = 'flex';
    }
});

const containerMyGifos = document.querySelector('.containerMyGifos')

// Delete My Gifo and item of DOM 
const deleteMyGifosHandler = (ev => {
    const btnMyGifoPressed = ev.target;
    const idMyGifoSelected = btnMyGifoPressed.getAttribute('data-id');
    const localMyGifos = JSON.parse(localStorage.getItem('myGifos'));
    for (i = 0; i < localMyGifos.length; i++) {
        if (localMyGifos[i].id == idMyGifoSelected) {
            localMyGifos.splice(i, 1);
        }
    };
    localStorage.setItem('myGifos', JSON.stringify(localMyGifos));
    location.reload();
});


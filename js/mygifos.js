document.addEventListener('DOMContentLoaded', () => {
    const localMyGifs = JSON.parse(localStorage.getItem('myGifos'));
    if (localMyGifs.length >= 1) {
        document.querySelector('.emptyMyGifosSection').style.display = 'none';

        console.log(localMyGifs)
        const urlsNewGifos = localMyGifs.map(id => `https://i.giphy.com/${id}.gif`);
        const gifosElements = urlsNewGifos.map(url => {
            const cardMyGifos = document.createElement("div");
            cardMyGifos.classList.add("container-img-mygifos");
            cardMyGifos.innerHTML = `
            <img class="imgMyGifos" src="${url}" alt="imgMyGifos">
            <div class="containerDetails">
                <div class="content-overlay"></div>
                <div class="content-details fadeIn-top fadeIn-left">
                    <div class="hoverIcons">
                    <a href="#"><i data-id="${url}" class="far fa-heart btnFavorites"></i></a>
                    <a href="#" class="btndownload"><i class="fas fa-download"></i></a>
                    <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                    </div>
                    <p class="textCardimg"></p>
                    <h6 class="titleCardimg"></h6>
                </div>
                </div>
            </div>`;

            // Modal Expand
            const expandMyGifs = cardMyGifos.querySelector('.btnModalExpand');
            // expand.addEventListener("touchstart", showModalExpand);
            // expand.addEventListener("touchend", showModalExpand);
            expandMyGifs.addEventListener("click", showModalExpand);
            expandMyGifs.imagegif = url;

            const imageMyGifOnclick = cardMyGifos.querySelector('img');
            // imageGifOnclick.addEventListener("touchstart", showModalExpand);
            // imageGifOnclick.addEventListener("touchend", showModalExpand);
            imageMyGifOnclick.addEventListener("click", showModalExpand);
            imageMyGifOnclick.imagegif = url;

            // Favorites
            const localGifos = JSON.parse(localStorage.getItem('gifos'));
            localGifos.gifos.push(url);
            localStorage.setItem('gifos', JSON.stringify(localGifos));
            cardMyGifos.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

            // Download
            cardMyGifos.querySelector('.btndownload').addEventListener("click", downloadGifs);

            return cardMyGifos;
        });

        gifosElements.forEach(gifo => {
            containerMyGifos.appendChild(gifo);
        });
    } else {
        document.querySelector('.emptyMyGifosSection').style.display = 'flex';
    }
});

const containerMyGifos = document.querySelector('.containerMyGifos')
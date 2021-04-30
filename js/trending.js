//Trending section
let sliderGallery = 3;

const printGifosSliderGallery =  (arr, slider) => {
    // if (window.matchMedia("(min-width: 768px)").matches) {
    //     // printGifosSliderGallery(arr, containerImages);
    // } else {
    for (let i = 0; i < slider; i++) {
        const cardGifos = document.createElement('div');
        cardGifos.classList.add('container-img-trendinggifos');
        cardGifos.innerHTML = `
            <img class="imgnewgifos" src="${arr.data[i].images.fixed_height.url}" alt="${arr.data[i].title}">
            <div class="containerDetails">
                <div class="content-overlay"></div> 
                    <div class="content-details fadeIn-top fadeIn-left">
                        <div class="hoverIcons">
                            <a href="#"><i data-id="${arr.data[i].id}" class="far fa-heart btnFavorites"></i></a>
                            <a href="#"><i class="fas fa-download btndownload"></i></a>
                            <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                        </div>
                        <p class="textCardimg">${arr.data[i].username}</p>
                        <h6 class="titleCardimg">${arr.data[i].title}</h6>
                    </div>
                </div>
            </div>`
        containerImages.appendChild(cardGifos);

        // Modal Expand
        const expandTrendingGifs = cardGifos.querySelector('.btnModalExpand');
        // expand.addEventListener("touchstart", showModalExpand);
        // expand.addEventListener("touchend", showModalExpand);
        expandTrendingGifs.addEventListener("click", showModalExpand);
        expandTrendingGifs.imagegif = arr.data[i].images.fixed_height.url;
        expandTrendingGifs.idgif = arr.data[i].id;
        expandTrendingGifs.username = arr.data[i].username;
        expandTrendingGifs.title = arr.data[i].title;

        const imageGifOnclickTrending = cardGifos.querySelector('img');
        // imageGifOnclick.addEventListener("touchstart", showModalExpand);
        // imageGifOnclick.addEventListener("touchend", showModalExpand);
        imageGifOnclickTrending.addEventListener("click", showModalExpand);
        imageGifOnclickTrending.imagegif = arr.data[i].images.fixed_height.url;
        imageGifOnclickTrending.idgif = arr.data[i].id;
        imageGifOnclickTrending.username = arr.data[i].username;
        imageGifOnclickTrending.title = arr.data[i].title;

        // Favorites
        const localGifos = JSON.parse(localStorage.getItem('gifos'));
        localGifos.gifos.push(arr.data[i]);
        localStorage.setItem('gifos', JSON.stringify(localGifos));
        cardGifos.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

        // Download
        cardGifos.querySelector('.btndownload').addEventListener("click", downloadGifs);
    };
    // };
};

const containerImages = document.querySelector('.container-slider');


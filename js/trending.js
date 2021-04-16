//Trending section
const gifosSliderGallery = (gifos) => {
    const containerImages = document.querySelector('.container-slider');
    if (window.matchMedia("(min-width: 768px)").matches) {
        printGifosSliderGallery(gifos, containerImages);
    } else {
        gifos.data.forEach(element => {
            const cardGifos = document.createElement('div');
            cardGifos.classList.add('container-img-trendinggifos');
            cardGifos.innerHTML = `
            <img class="imgnewgifos" src="${element.images.fixed_height.url}" alt="${element.title}">
            <div class="containerDetails">
                <div class="content-overlay"></div>
                    <div class="content-details fadeIn-top fadeIn-left">
                        <div class="hoverIcons">
                            <a href="#"><i class="far fa-heart"></i></a>
                            <a href="#"><i class="fas fa-download btndownload"></i></a>
                            <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                        </div>
                        <p class="textCardimg">${element.username}</p>
                        <h6 class="titleCardimg">${element.title}</h6>
                    </div>
                </div>
            </div>`
            containerImages.appendChild(cardGifos);
        });
    };
};

let sliderGallery = 3;

const arrTrending = [];



const printGifosSliderGallery = (arr, container) => {
    for (i = sliderGallery - 3; i < sliderGallery; i++) {
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
        container.appendChild(cardGifos);

        // Modal Expand
        const expandTrendingGifs = cardGifos.querySelector('.btnModalExpand');
        // expand.addEventListener("touchstart", showModalExpand);
        // expand.addEventListener("touchend", showModalExpand);
        expandTrendingGifs.addEventListener("click", showModalExpand);
        expandTrendingGifs.imagegif = arr.data[i].images.fixed_height.url;
        expandTrendingGifs.username = arr.data[i].username;
        expandTrendingGifs.title = arr.data[i].title;

        const imageGifOnclickTrending = cardGifos.querySelector('img');
        // imageGifOnclick.addEventListener("touchstart", showModalExpand);
        // imageGifOnclick.addEventListener("touchend", showModalExpand);
        imageGifOnclickTrending.addEventListener("click", showModalExpand);
        imageGifOnclickTrending.imagegif = arr.data[i].images.fixed_height.url;
        imageGifOnclickTrending.username = arr.data[i].username;
        imageGifOnclickTrending.title = arr.data[i].title;

        // Favorites
        const localGifos = JSON.parse(localStorage.getItem('gifos'));
        localGifos.gifos.push(arr.data[i]);
        console.log(arr.data)
        localStorage.setItem('gifos', JSON.stringify(localGifos));
        cardGifos.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

        // Download
        cardGifos.querySelector('.btndownload').addEventListener("click", downloadGifs);
    };
};

// Left
const carrouselLeft = () => {
    sliderGallery--;
    if (sliderGallery == 3) {
        sliderGallery = 12
    }
    const containerImages = document.querySelector('.container-slider');
    containerImages.innerHTML = "";
    gifosSliderGallery(arrTrending);
};

// Right
const carrouselRight = () => {
    sliderGallery++;
    if (sliderGallery == 13) {
        sliderGallery = 3
    }
    const containerImages = document.querySelector('.container-slider');
    containerImages.innerHTML = "";
    gifosSliderGallery(arrTrending);
};

const trendingToArr = (arr) => {
    arr.data.forEach(el => {
        arrTrending.push(el);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    document.querySelector(".leftBtn").addEventListener("click", carrouselLeft);
    document.querySelector(".rightBtn").addEventListener("click", carrouselRight);
});

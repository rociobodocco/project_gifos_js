//Trending section
let slider = 3;
const printCarrousel = (arr, container) => {
    for (i = slider - 3; i < slider; i++) {
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
    };
};

let count = 0;

const showNewTrendings = async (count) => {
    const API_URL = 'https://api.giphy.com/v1/gifs/trending?&random_id=e826c9fc5c929e0d6c6d423841a282aa&rating=g';
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const gifosData = await getGifos(API_URL, API_KEY);

    containerImages.innerHTML = '';
    newCount = count + 3;
    const totalGifs = gifosData.data.length;

    for (i = count; i < newCount; i++) {
        const newCardGifos = document.createElement('div');
        newCardGifos.classList.add('container-img-trendinggifos');
        newCardGifos.innerHTML = `
        <img class="imgnewgifos" src="${gifosData.data[i].images.fixed_height.url}" alt="${gifosData.data[i].title}">
        <div class="containerDetails">
            <div class="content-overlay"></div> 
                <div class="content-details fadeIn-top fadeIn-left">
                    <div class="hoverIcons">
                        <a href="#"><i data-id="${gifosData.data[i].id}" class="far fa-heart btnFavorites"></i></a>
                        <a href="#"><i class="fas fa-download btndownload"></i></a>
                        <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                    </div>
                    <p class="textCardimg">${gifosData.data[i].username}</p>
                    <h6 class="titleCardimg">${gifosData.data[i].title}</h6>
                </div>
            </div>
        </div>`;

        trendingList.appendChild(newCardGifos);
    };
    count++;
};

showNewTrendings(count);

const containerImages = document.querySelector('.container-slider');
const gifosTrendingGallery = document.querySelector('.gifosTrendingGallery');
const btnRight = document.querySelector(".rightBtn");
const btnLeft = document.querySelector(".leftBtn");

let trendingList = containerImages;

btnRight.addEventListener("click", () => {
    count++;
    showNewTrendings(count);
});

btnLeft.addEventListener("click", () => {
    count--;
    showNewTrendings(count);
});
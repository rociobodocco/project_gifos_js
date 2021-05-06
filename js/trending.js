//Trending section
const printCarrousel = (arr) => {
    arr.data.forEach(trendGif => {
        const cardGifos = document.createElement('div');
        cardGifos.classList.add('container-img-trendinggifos');
        cardGifos.innerHTML = `
            <img class="imgnewgifos" src="${trendGif.images.fixed_height.url}" alt="${trendGif.title}">
            <div class="containerDetails">
                <div class="content-overlay"></div> 
                    <div class="content-details fadeIn-top fadeIn-left">
                        <div class="hoverIcons">
                            <a href="#"><i data-id="${trendGif.id}" class="far fa-heart btnFavorites"></i></a>
                            <a href="#"><i class="fas fa-download btndownload"></i></a>
                            <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                        </div>
                        <p class="textCardimg">${trendGif.username}</p>
                        <h6 class="titleCardimg">${trendGif.title}</h6>
                    </div>
                </div>
            </div>`
        containerImages.appendChild(cardGifos);

        // Modal Expand
        const expand = cardGifos.querySelector('.btnModalExpand');
        // expand.addEventListener("touchstart", showModalExpand);
        // expand.addEventListener("touchend", showModalExpand);
        expand.addEventListener("click", showModalExpand);
        expand.imagegif = trendGif.images.fixed_height.url;
        expand.idgif = trendGif.id;
        expand.username = trendGif.username;
        expand.title = trendGif.title;

        const imageGifOnclick = cardGifos.querySelector('img');
        // imageGifOnclick.addEventListener("touchstart", showModalExpand);
        // imageGifOnclick.addEventListener("touchend", showModalExpand);
        imageGifOnclick.addEventListener("click", showModalExpand);
        imageGifOnclick.imagegif = trendGif.images.fixed_height.url;
        imageGifOnclick.idgif = trendGif.id;
        imageGifOnclick.username = trendGif.username;
        imageGifOnclick.title = trendGif.title;

        // Favorites
        const localGifos = JSON.parse(localStorage.getItem('gifos'));
        localGifos.gifos.push(trendGif);
        localStorage.setItem('gifos', JSON.stringify(localGifos));

        cardGifos.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

        // Download
        const downloadGifs = async (ev) => {
            const downloadUrl = `https://media.giphy.com/media/${trendGif.id}/giphy.gif`;
            console.log(downloadUrl)
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

        cardGifos.querySelector('.btndownload').addEventListener("click", downloadGifs);

        
    });
};

let count = 0;

const showNewTrendings = async (count) => {
    const API_URL = 'https://api.giphy.com/v1/gifs/trending?&random_id=e826c9fc5c929e0d6c6d423841a282aa&rating=g';
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const gifosData = await getGifos(API_URL, API_KEY);
    containerImages.innerHTML = '';
    newCount = count + 3;

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

        // Modal Expand
        const expand = newCardGifos.querySelector('.btnModalExpand');
        // expand.addEventListener("touchstart", showModalExpand);
        // expand.addEventListener("touchend", showModalExpand);
        expand.addEventListener("click", showModalExpand);
        expand.imagegif = gifosData.data[i].images.fixed_height.url;
        expand.idgif = gifosData.data[i].id;
        expand.username = gifosData.data[i].username;
        expand.title = gifosData.data[i].title;

        const imageGifOnclick = newCardGifos.querySelector('img');
        // imageGifOnclick.addEventListener("touchstart", showModalExpand);
        // imageGifOnclick.addEventListener("touchend", showModalExpand);
        imageGifOnclick.addEventListener("click", showModalExpand);
        imageGifOnclick.imagegif = gifosData.data[i].images.fixed_height.url;
        imageGifOnclick.idgif = gifosData.data[i].id;
        imageGifOnclick.username = gifosData.data[i].username;
        imageGifOnclick.title = gifosData.data[i].title;

        // Favorites
        const localGifos = JSON.parse(localStorage.getItem('gifos'));
        localGifos.gifos.push(gifosData.data[i]);
        localStorage.setItem('gifos', JSON.stringify(localGifos));

        newCardGifos.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

        // Download
        const downloadGifs = async (ev) => {
            const downloadUrl = `https://media.giphy.com/media/${gifosData.data[i].id}/giphy.gif`;
            console.log(downloadUrl)
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

        newCardGifos.querySelector('.btndownload').addEventListener("click", downloadGifs);
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
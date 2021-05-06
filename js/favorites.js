const initFavorites = () => {

  if (localStorage.getItem('favorites')) {

  } else {
    localStorage.setItem('favorites', JSON.stringify({ favorites: [] }));
  }

  const gifosArr = localStorage.setItem('gifos', JSON.stringify({ gifos: [] }));
};

// Print Favorites funtion 
const printFavorites = () => {

  const localFavorites = JSON.parse(localStorage.getItem('favorites'));
  const emptyFavSec = document.querySelector(".emptyFavoritesSection");

  if (localFavorites.favorites.length >= 1) {

    emptyFavSec.style.display = 'none';


    localFavorites.favorites.forEach(fav => {
      const cardGifosFav = document.createElement("div");
      cardGifosFav.classList.add("container-img-favGifos");
      cardGifosFav.innerHTML = `
        <img class="imgFavoritesGifos" id="${fav.id}" src="${fav.images.fixed_height.url}" alt="imgGifos">
        <div class="containerDetails">
            <div class="content-overlay"></div>
            <div class="content-details fadeIn-top fadeIn-left">
                <div class="hoverIcons">
                  <a href="#"><i data-id="${fav.id}" class="far fa-heart btnRemoveFavorites"></i></a>
                  <a href="#" class="btndownload"><i class="fas fa-download"></i></a>
                  <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                </div>
                <p class="textCardimg">${fav.username}</p>
                <h6 class="titleCardimg">${fav.title}</h6>
            </div>
            </div>
        </div>`;
      containerFavorites.appendChild(cardGifosFav);

      // Modal Expand
      const expandFavGifs = cardGifosFav.querySelector('.btnModalExpand');
      // expand.addEventListener("touchstart", showModalExpand);
      // expand.addEventListener("touchend", showModalExpand);
      expandFavGifs.addEventListener("click", showModalExpand);
      expandFavGifs.imagegif = fav.images.fixed_height.url;
      expandFavGifs.username = fav.username;
      expandFavGifs.title = fav.title;

      const imageGifOnclickFav = cardGifosFav.querySelector('img');
      // imageGifOnclick.addEventListener("touchstart", showModalExpand);
      // imageGifOnclick.addEventListener("touchend", showModalExpand);
      imageGifOnclickFav.addEventListener("click", showModalExpand);
      imageGifOnclickFav.imagegif = fav.images.fixed_height.url;
      imageGifOnclickFav.username = fav.username;
      imageGifOnclickFav.title = fav.title;

      // Download
      const downloadGifs = async (ev) => {
        const downloadUrl = `https://media.giphy.com/media/${fav.id}/giphy.gif`;
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

      containerFavorites.querySelector('.btndownload').addEventListener("click", downloadGifs);


      // Remove Favorites
      cardGifosFav.querySelector('.btnRemoveFavorites').addEventListener("click", removeFavoritesHandler);

    });
  } else {
    emptyFavSec.style.display = 'flex';
  };
};

const containerFavorites = document.querySelector('.containerFavorites');

// Add Favorites and print
const addFavoritesHandler = (ev => {
  const btnFavPressed = ev.target;
  const idGifoSelected = btnFavPressed.getAttribute('data-id');
  const localGifos = JSON.parse(localStorage.getItem('gifos'));
  const gifosJson = localGifos.gifos.find(g => g.id === idGifoSelected);
  const localFavorites = JSON.parse(localStorage.getItem('favorites'));
  localFavorites.favorites.push(gifosJson);
  localStorage.setItem('favorites', JSON.stringify(localFavorites));
  printFavorites();
});

// Remove Favorite and delete item of DOM 
const removeFavoritesHandler = (ev => {
  const btnFavPressed = ev.target;
  const idFavSelected = btnFavPressed.getAttribute('data-id');
  const localFav = JSON.parse(localStorage.getItem('favorites'));
  for (i = 0; i < localFav.favorites.length; i++) {
    if (localFav.favorites[i].id == idFavSelected) {
      localFav.favorites.splice(i, 1);
    }
  };
  localStorage.setItem('favorites', JSON.stringify(localFav));
  location.reload();
});
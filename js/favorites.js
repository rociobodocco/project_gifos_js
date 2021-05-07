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


      // Modal expand Fav
      const showModalExpandFavMobile = () => {
        const modal = document.createElement('div');
        modal.classList.add('show');
        modal.innerHTML = `
          <i class="fas fa-times close-btn-modalExpand"></i>
          <div class="img-expand"> 
          <img class="modalImg"  src="${fav.images.fixed_height.url}" alt="${fav.title}">
          </div>
          <div class="constainerIcons">
            <a href="#"><i data-id="${fav.id}" class="far fa-heart btnRemoveFavorites"></i></a>
            <a href="#"><i data-id="${fav.id}" class="fas fa-download btndownload"></i></a>
          </div> 
          <p class="textCardimg">${fav.username}</p>
          <h6 class="titleCardimg">${fav.title}</h6>`;


        document.querySelector('.favoriteSection').appendChild(modal);

        modal.querySelector('.close-btn-modalExpand').addEventListener("click", () => {
          modal.style.display = "none";
        });

        modal.querySelector('.btnRemoveFavorites').addEventListener("click", removeFavoritesHandler);

        // Download
        const downloadGifs = async () => {
          const downloadUrl = `https://media.giphy.com/media/${fav.id}/giphy.gif`;
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
        const expandFavGifs = cardGifosFav.querySelector('.btnModalExpand');
        // expandFavGifs.addEventListener("touchstart", showModalExpand);
        // expandFavGifs.addEventListener("touchend", showModalExpand);
        expandFavGifs.addEventListener("click", showModalExpand);
        expandFavGifs.imagegif = fav.images.fixed_height.url;
        expandFavGifs.username = fav.username;
        expandFavGifs.title = fav.title;

        const imageGifOnclickFav = cardGifosFav.querySelector('img');
        // imageGifOnclickFav.addEventListener("touchstart", showModalExpand);
        // imageGifOnclickFav.addEventListener("touchend", showModalExpand);
        imageGifOnclickFav.addEventListener("click", showModalExpand);
        imageGifOnclickFav.imagegif = fav.images.fixed_height.url;
        imageGifOnclickFav.username = fav.username;
        imageGifOnclickFav.title = fav.title;
      } else {
        // Modal Expand
        const expandFavGifs = cardGifosFav.querySelector('.btnModalExpand');
        // expandFavGifs.addEventListener("touchstart", showModalExpand);
        // expandFavGifs.addEventListener("touchend", showModalExpand);
        expandFavGifs.addEventListener("click", showModalExpandFavMobile);
        expandFavGifs.imagegif = fav.images.fixed_height.url;
        expandFavGifs.username = fav.username;
        expandFavGifs.title = fav.title;

        const imageGifOnclickFav = cardGifosFav.querySelector('img');
        // imageGifOnclickFav.addEventListener("touchstart", showModalExpand);
        // imageGifOnclickFav.addEventListener("touchend", showModalExpand);
        imageGifOnclickFav.addEventListener("click", showModalExpandFavMobile);
        imageGifOnclickFav.imagegif = fav.images.fixed_height.url;
        imageGifOnclickFav.username = fav.username;
        imageGifOnclickFav.title = fav.title;
      };

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

      cardGifosFav.querySelector('.btndownload').addEventListener("click", downloadGifs);


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


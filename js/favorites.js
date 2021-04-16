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
    const containerFavorites = document.querySelector('.containerFavorites');
    localFavorites.favorites.forEach(fav => {
      const cardGifosFav = document.createElement("div");
      cardGifosFav.classList.add("container-img-favGifos");
      cardGifosFav.innerHTML = `
        <img class="imgFavoritesGifos" src="${fav.images.fixed_height.url}" alt="imgGifos">
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

      // cardGifosFav.querySelector('.btnRemoveFavorites').addEventListener("click", removeFavoritesHandler);
    });
  } else {
    emptyFavSec.style.display = 'flex';
  }
};

// Handler function
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

// const removeFavoritesHandler = (ev => {
//   const btnFavPressed = ev.target;
//   const idGifoSelected = btnFavPressed.getAttribute('data-id');
//   const localFavorites = JSON.parse(localStorage.getItem('favorites'));
//   const favJson = localFavorites.favorites.find(f => f.id === idGifoSelected);
//   const localGifos = JSON.parse(localStorage.getItem('gifos'));
//   localGifos.gifos.push(favJson);
//   localStorage.setItem('gifos', JSON.stringify(localGifos));
// });


// const removeGif = (gif) => {
// 	let arrFavoriteParsed = JSON.parse(localStorage.getItem('FavoriteGifs'));
// 	console.log(arrFavoriteParsed);
// 	for (let i = 0; i < arrFavoriteParsed.length; i++) {
// 		if (arrFavoriteParsed[i].gif === gif) {
// 			arrFavoriteParsed.splice(i, 1);
// 			localStorage.setItem(
// 				'FavoriteGifs',
// 				JSON.stringify(arrFavoriteParsed)
// 			);
// 			displayFavoriteSection(event);
// 			closeMaximized();
// 		}
// 	}
// };
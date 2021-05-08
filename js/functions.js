// Apply shadow scroll down 
const headerFixed = document.querySelector("header");
const headerScroll = headerFixed.offsetTop;

const scrollHeaderFunction = () => {
  if (window.pageYOffset > headerScroll) {
    headerFixed.classList.toggle("fixedHeaderShadow");
  }
};

window.addEventListener('scroll', scrollHeaderFunction);

// ----------------------------------------------------------------------------
// // When the user scrolls the page, execute myFunction // REVISAR FUNCIÓN SCROLL INPUT 
// // Get the trending
// const trending = document.querySelector(".containerSearch");
// // Get the offset position of the navbar
// const sticky = trending.offsetTop;

// // Add the sticky class to the trending when you reach its scroll position. Remove "sticky" when you leave the scroll position
// const moveButtonSeach = () => {
//   if (window.pageYOffset > sticky) {
//     trending.classList.toggle("sticky");
//   } else {
//     trending.classList.toggle("sticky");
//   }
// };

// window.addEventListener('scroll', moveButtonSeach);


// --------------------------------------------------------------------------
// Change Theme (dark/light):
const buttonColorMode = document.querySelector('.changeTheme');

if (localStorage.getItem("modeSelect") == null) { localStorage.setItem("modeSelect", "Diurno"); }

let modeSelect = localStorage.getItem("modeSelect");

if (modeSelect == "Nocturno") {
  document.body.classList.toggle("night-mode");
  buttonColorMode.textContent = 'Modo Diurno';
  document.querySelector('.imglogo').src = "./css/images/Logo-modo-noc.svg";

  if (document.querySelector('.trendingSection')) {
    document.querySelector('.leftBtn > img').src = "./css/images/button-slider-left-md-noct.svg";
    document.querySelector('.rightBtn > img').src = "./css/images/button-slider-right-md-noct.svg";
  }

  if (document.querySelector('.contairer-create')) {
    document.querySelector('.animationCinta1').src = "./css/images/element_cinta1-modo-noc.svg";
    document.querySelector('.animationCinta2').src = "./css/images/element_cinta2-modo-noc.svg";
    document.querySelector('.animationCinta3').src = "./css/images/pelicula-modo-noc.svg";
  }

} else {
  buttonColorMode.textContent = 'Modo Nocturno';
}


buttonColorMode.addEventListener("click", () => {

  let modeSelect = localStorage.getItem("modeSelect");

  document.body.classList.toggle("night-mode");

  if (modeSelect == "Diurno") {
    localStorage.setItem("modeSelect", "Nocturno");
    buttonColorMode.textContent = 'Modo Diurno';
    document.querySelector('.imglogo').src = "./css/images/Logo-modo-noc.svg";

    if (document.querySelector('.trendingSection')) {
      document.querySelector('.leftBtn > img').src = "./css/images/button-slider-left-md-noct.svg";
      document.querySelector('.rightBtn > img').src = "./css/images/button-slider-right-md-noct.svg";
    }

    if (document.querySelector('.contairer-create')) {
      document.querySelector('.animationCinta1').src = "./css/images/element_cinta1-modo-noc.svg";
      document.querySelector('.animationCinta2').src = "./css/images/element_cinta2-modo-noc.svg";
      document.querySelector('.animationCinta3').src = "./css/images/pelicula-modo-noc.svg";
    }

  } else {
    localStorage.setItem("modeSelect", "Diurno");
    buttonColorMode.textContent = 'Modo Nocturno';
    document.querySelector('.imglogo').src = "./css/images/logo-desktop.svg";

    if (document.querySelector('.trendingSection')) {
      document.querySelector('.leftBtn > img').src = "./css/images/button-slider-left.svg";
      document.querySelector('.rightBtn > img').src = "./css/images/button-slider-right.svg";
    }

    if (document.querySelector('.contairer-create')) {
      document.querySelector('.animationCinta1').src = "./css/images/element_cinta1.svg";
      document.querySelector('.animationCinta2').src = "./css/images/element_cinta2.svg";
      document.querySelector('.animationCinta3').src = "./css/images/pelicula.svg";
    }
  }
});

// --------------------------------------------------------------------------
// Modal expand:
const showModalExpand = (ev) => {
  const modal = document.createElement('div');
  modal.classList.add('show');
  modal.innerHTML = `
  <i class="fas fa-times close-btn-modalExpand"></i>
  <div class="img-expand"> 
  <img class="modalImg"  src="${ev.target.imagegif}" alt="${ev.target.title}">
  </div>
  <div class="constainerIcons">
    <a href="#"><i data-id="${ev.target.idgif}" class="far fa-heart btnFavorites"></i></a>
    <a href="#"><i data-id="${ev.target.idgif}" class="fas fa-download btndownload"></i></a>
  </div> 
  <p class="textCardimg">${ev.target.username}</p>
  <h6 class="titleCardimg">${ev.target.title}</h6>`;

  if (document.querySelector('.home')) {
    document.querySelector('.home').appendChild(modal);
  }

  if (document.querySelector('.favoriteSection')) {
    document.querySelector('.favoriteSection').appendChild(modal);
  }

  if (document.querySelector('.misgifosSection')) {
    document.querySelector('.misgifosSection').appendChild(modal);
  }

  modal.querySelector('.close-btn-modalExpand').addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Favorites
  const localGifos = JSON.parse(localStorage.getItem('gifos'));
  localGifos.gifos.push(ev.target.idgif);
  localStorage.setItem('gifos', JSON.stringify(localGifos));

  modal.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

  // Download
  const downloadGifs = async () => {
    const downloadUrl = `https://media.giphy.com/media/${ev.target.idgif}/giphy.gif`;
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
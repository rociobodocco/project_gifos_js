// Apply shadow scroll down 
const headerFixed = document.querySelector("header");
const headerScroll = headerFixed.offsetTop;

const scrollHeaderFunction = () => { 
  if (window.pageYOffset > headerScroll) {
    headerFixed.classList.toggle("fixedHeaderShadow");
  }
};

window.addEventListener('scroll',scrollHeaderFunction);

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
buttonColorMode.addEventListener("click", () => {
  document.body.classList.toggle("night-mode");
});



const showModalExpand = (ev) => {
  const modal = document.querySelector(".show");
  modal.style.display = 'flex';
  modal.innerHTML = `
  <i class="fas fa-times close-btn-modalExpand"></i>
  <div class="img-expand"> 
  <img src="${ev.target.imagegif}" alt="${ev.target.title}">
  </div>
  <div class="constainerIcons">
    <a href="#"><i class="far fa-heart btnFavorites"></i></a>
    <a href="#"><i class="fas fa-download btndownload"></i></a>
  </div> 
  <p class="textCardimg">${ev.target.username}</p>
  <h6 class="titleCardimg">${ev.target.title}</h6>`;

  modal.querySelector('.close-btn-modalExpand').addEventListener("click", () => {
    modal.style.display = "none";
  });
};
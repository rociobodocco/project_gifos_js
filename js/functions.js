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

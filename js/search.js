// Function close ul suggestions
const closeModal = (ev) => {
  if (inputUserValue.value !== " ") {
    inputUserValue.value = " ";
    containerSuggestions.style.display = "none";
    lineSpaceSuggestion.style.display = "none";
    containerTitleSearch.style.display = "none";
    containerGifsSearch.style.display = "none";
    btnSeeMoreGifos.style.display = "none";
  };
};

// Function empty search
const searchEmptyMsg = (ev) => {
  const searchEmpty = document.createElement("div");
  searchEmpty.classList.add("searchEmpty");
  searchEmpty.innerHTML = `<div class="containerImgSearchEmpty">
    <img class="imgSearchEmpty" src="./images/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultados">
    </div>
    <p class="newtextnotfoundsearch">"Intenta con otra búsqueda."</p>`;
  containerGifsSearch.appendChild(searchEmpty);
};



// Initial Offset
let offsetGifos = 0;

// Print Gifos
const printGifs = (gifs) => {
  gifs.data.forEach(gif => {
    const cardGifosSearch = document.createElement("div");
    cardGifosSearch.classList.add("container-img-searchGifos");
    cardGifosSearch.innerHTML = `
      <img class="imgnewgifosSearch" src="${gif.images.fixed_height.url}" alt="imgGifos">
      <div class="containerDetails">
          <div class="content-overlay"></div>
          <div class="content-details fadeIn-top fadeIn-left">
              <div class="hoverIcons">
                <a href="#"><i data-id="${gif.id}" class="far fa-heart btnFavorites"></i></a>
                <a href="#"><i class="fas fa-download btndownload"></i></a>
                <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
              </div>
              <p class="textCardimg">${gif.username}</p>
              <h6 class="titleCardimg">${gif.title}</h6>
          </div>
          </div>
      </div>`;
    containerGifsSearch.appendChild(cardGifosSearch);

    // Modal Expand
    const expand = cardGifosSearch.querySelector('.btnModalExpand');
    // expand.addEventListener("touchstart", showModalExpand);
    // expand.addEventListener("touchend", showModalExpand);
    expand.addEventListener("click", showModalExpand);
    expand.imagegif = gif.images.fixed_height.url;
    expand.idgif = gif.id;
    expand.username = gif.username;
    expand.title = gif.title;

    const imageGifOnclick = cardGifosSearch.querySelector('img');
    // imageGifOnclick.addEventListener("touchstart", showModalExpand);
    // imageGifOnclick.addEventListener("touchend", showModalExpand);
    imageGifOnclick.addEventListener("click", showModalExpand);
    imageGifOnclick.imagegif = gif.images.fixed_height.url;
    imageGifOnclick.idgif = gif.id;
    imageGifOnclick.username = gif.username;
    imageGifOnclick.title = gif.title;

    // Favorites
    const localGifos = JSON.parse(localStorage.getItem('gifos'));
    localGifos.gifos.push(gif);
    localStorage.setItem('gifos', JSON.stringify(localGifos));

    cardGifosSearch.querySelector('.btnFavorites').addEventListener("click", addFavoritesHandler);

    // Download
    cardGifosSearch.querySelector('.btndownload').addEventListener("click", downloadGifs);
  });
};

// Create btn see more Gifs
const createButton = () => {
  const containerHome = document.querySelector(".home");
  const btnAddMoreGifos = document.createElement("button");
  btnAddMoreGifos.classList.toggle('btnSeeMoreGifos');
  btnAddMoreGifos.textContent = "VER MÁS";
  containerHome.appendChild(btnAddMoreGifos);
};

// Handler suggestion and search
const getSuggestionsHandler = async (ev) => {
  const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";

  // Reset HTML:
  containerSuggestions.innerHTML = "";
  containerGifsSearch.innerHTML = "";
  lineSpaceSuggestion.style.display = "none";
  inputUserValue.style.order = "0";
  newLableClose.style.display = "none";
  lableIconSearch.style.color = "#572EE5";

  // Print suggestions
  if ((ev.target.value >= 3 && ev.keyCode !== 13) || ev.keyCode !== "Enter") {
    const initialTagsSuggestion = ev.target.value;
    const suggestions = await getSearchTags(API_KEY, initialTagsSuggestion);

    // Input Value empty:
    if (initialTagsSuggestion == "") {
      containerTitleSearch.style.display = "none";
      const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
      btnSeeMoreGifos.style.display = 'none';
      // lableIconSearch.style.display = "none";
    } else {
      // Input with value:
      containerSuggestions.style.display = "block";
      lineSpaceSuggestion.style.display = "block";
      containerInput.appendChild(newLableClose);
      lableIconSearch.style.color = "#9CAFC3";
      newLableClose.style.display = "inline";
      newLableClose.style.order = "2";
      inputUserValue.style.order = "1";

      const printSuggestionUl = (list) => {
        list.data.forEach(sug => {
          const newLi = document.createElement("li");
          newLi.classList.add("itemSuggestions");
          newLi.innerHTML = `<i class="fas fa-search s"></i>${sug.name}`;
          containerSuggestions.appendChild(newLi);
          newLi.addEventListener("click", (ev) => {
            const input = inputUserValue;
            input.value = ev.target.textContent;
          })
        });
      };
      printSuggestionUl(suggestions);
    };
  };

  // Print Search
  if (ev.keyCode === 13 || ev.keyCode === "Enter") {
    createButton();
    const initialKeyWord = ev.target.value;
    const initialGifs = await getGifsByKeyword(API_KEY, initialKeyWord, offsetGifos);

    containerSuggestions.style.display = "none";
    lineSpaceSuggestion.style.display = "none";

    // Input Value empty with msg
    if (ev.target.value === "") {
      searchEmptyMsg();
    } else {
      // Print gifos of input Value
      newtitleSearch.textContent = inputUserValue.value;
      containerTitleSearch.appendChild(newLineSpaceSearch);
      containerTitleSearch.appendChild(newtitleSearch);
      containerTitleSearch.style.display = "block";
      containerGifsSearch.style.display = "grid";
      printGifs(initialGifs);
    };
    
    // Pagination
    const seeMore = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifos += 12;
      const nextGifts = await getGifsByKeyword(API_KEY, initialKeyWord, offsetGifos);
      printGifs(nextGifts);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMore)
    };

  };
  
  // lableIconSearch.addEventListener("click", async () => {
  //   const initialKeyWordSug = ev.target.value;
  //   const initialGifssug = await getGifsByKeyword( API_KEY, initialKeyWordSug, offsetGifos);
  //   // console.log(initialGifssug)
  //   newtitleSearch.textContent = inputUserValue.value;
  //   containerTitleSearch.appendChild(newLineSpaceSearch);
  //   containerTitleSearch.appendChild(newtitleSearch);
  //   containerTitleSearch.style.display = "block";
  //   containerGifsSearch.style.display = "grid";
  //   console.log(initialGifssug)
  //   printGifs(initialGifssug)
  //   createButton();
  // });
};




// Global const
const containerSuggestions = document.querySelector(".containerAutocomplete");
const containerGifsSearch = document.querySelector(".containerGifsSearch");
const lineSpaceSuggestion = document.querySelector(".lineSearchSuggestions");
const inputUserValue = document.querySelector(".inputTextSearch");
const lableIconSearch = document.querySelector(".search");


// Create new Title Search
const containerTitleSearch = document.querySelector(".containerTitleSearch");
const newtitleSearch = document.createElement("h2");
newtitleSearch.classList.add("newtitleSearch");
const newLineSpaceSearch = document.createElement("hr");
newLineSpaceSearch.classList.add("lineSearch");

// Cretate btn cross close
const containerInput = document.querySelector(".containerInputIcons");
const newLableClose = document.createElement("label");
newLableClose.classList.add("cross");
newLableClose.setAttribute("for", "inputTextSearch");
newLableClose.innerHTML = `<i class="fas fa-times xs"></i>`;


// const suggestionSelect = (ev) => {
//   printSuggestionUl(suggestions);
//   const itemSuggestionSelect = document.querySelector('.itemSuggestions');
//   itemSuggestionSelect.value;
// }; 
// document.querySelector('.itemSuggestions').addEventListener('click', suggestionSelect);

inputUserValue.addEventListener("keyup", getSuggestionsHandler);
newLableClose.addEventListener("click", closeModal);
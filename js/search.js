// Function close ul suggestions
const closeModal = (ev) => {
  if (inputUserValue.value !== " ") {
    inputUserValue.value = " ";
    inputUserValue.style.order = "0";
    containerSuggestions.innerHTML = "";
    newLableClose.style.display = "none";
    lableIconSearch.style.color = "#572EE5";
    lineSpaceSuggestion.style.display = "none";
    containerTitleSearch.style.display = "none";
    containerGifsSearch.innerHTML = "";
    btnSeeMoreGifos.style.display = 'none';
  };
};

// Function empty search
const searchEmptyMsg = (ev) => {
  const searchEmpty = document.createElement("div");
  searchEmpty.classList.add("searchEmpty");
  searchEmpty.innerHTML = `<div class="containerImgSearchEmpty">
    <img class="imgSearchEmpty" src="./css/images/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultados">
    </div>
    <p class="newtextnotfoundsearch">"Intenta con otra búsqueda."</p>`;
  containerGifsSearch.appendChild(searchEmpty);

};

// Initial Offset
let offsetGifosSuggestionsEv = 0;
let offsetGifosEnterEv = 0;
let offsetGifosIconSearchEv = 0;
let offsetGifosTrendTopEv = 0;

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
    const downloadGifs = async (ev) => {
      const downloadUrl = `https://media.giphy.com/media/${gif.id}/giphy.gif`;
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
createButton();
const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
btnSeeMoreGifos.style.display = "none";

// Handler suggestion and search
const getSuggestionsHandler = async (ev) => {
  const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";

  inputUserValue.style.order = "0";
  containerSuggestions.innerHTML = "";
  newLableClose.style.display = "none";
  lableIconSearch.style.color = "#572EE5";
  lineSpaceSuggestion.style.display = "none";
  containerGifsSearch.innerHTML = "";
  containerTitleSearch.style.display = "none";

  // Print gifos of input Value
  const printInputComplete = () => {
    newtitleSearch.textContent = inputUserValue.value;
    containerTitleSearch.appendChild(newLineSpaceSearch);
    containerTitleSearch.appendChild(newtitleSearch);
    containerTitleSearch.style.display = "block";
    containerGifsSearch.style.display = "grid";
  }

  // Print Gifos Search click Event
  if ((ev.target.value >= 3 && ev.keyCode !== 13) || ev.keyCode !== "Enter") {
    const initialTagsSuggestion = ev.target.value;
    const suggestions = await getSearchTags(API_KEY, initialTagsSuggestion);

    // Input Value empty:
    if (initialTagsSuggestion == "") {
      containerTitleSearch.style.display = "none";
      btnSeeMoreGifos.style.display = "none";
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

          newLi.addEventListener("click", async (ev) => {
            const input = inputUserValue;
            input.value = ev.target.textContent;
            lableIconSearch.style.color = "#9CAFC3";
            newLableClose.style.display = "inline";
            newLableClose.style.order = "2";
            inputUserValue.style.order = "1";
            const initialGifsSuggEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosSuggestionsEv);
            if (ev.target.value === "") {
              searchEmptyMsg();
              btnSeeMoreGifos.style.display = "none";
            } else {
              printInputComplete()
              printGifs(initialGifsSuggEv);
            };

            // Pagination
            const seeMore = async (ev) => {
              const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
              offsetGifosSuggestionsEv += 12;

              const nextGiftsSuggEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosSuggestionsEv);
              printGifs(nextGiftsSuggEv);
            };

            const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
            if (btnSeeMoreGifos) {
              btnSeeMoreGifos.addEventListener("click", seeMore)
            };
            btnSeeMoreGifos.style.display = "block";
          });
        });
      };
      printSuggestionUl(suggestions);
    };
  };

  // Print Gifos Search Enter Event
  if (ev.keyCode === 13 || ev.keyCode === "Enter") {
    const initialKeyWordEnterEv = ev.target.value;
    const initialGifsEnterEv = await getGifsByKeyword(API_KEY, initialKeyWordEnterEv, offsetGifosEnterEv);

    containerSuggestions.style.display = "none";
    lineSpaceSuggestion.style.display = "none";

    // Input Value empty with msg
    if (ev.target.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      printInputComplete()
      printGifs(initialGifsEnterEv);
    }

    // Pagination
    const seeMoreEnterEv = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosEnterEv += 12;
      const nextGiftsEnterEv = await getGifsByKeyword(API_KEY, initialKeyWordEnterEv, offsetGifosEnterEv);
      printGifs(nextGiftsEnterEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMoreEnterEv)
    };
    btnSeeMoreGifos.style.display = "block";
  };

  // Print Gifos Search click lens Event
  lableIconSearch.addEventListener("click", async () => {
    const initialKeyWordIconEv = inputUserValue.value;
    lableIconSearch.style.color = "#9CAFC3";
    newLableClose.style.display = "inline";
    newLableClose.style.order = "2";
    inputUserValue.style.order = "1";
    const initialGifsIconEv = await getGifsByKeyword(API_KEY, initialKeyWordIconEv, offsetGifosIconSearchEv);
    containerSuggestions.style.display = "none";
    lineSpaceSuggestion.style.display = "none";

    // Input Value empty with msg
    if (inputUserValue.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      printInputComplete()
      printGifs(initialGifsIconEv);
    }


    // Pagination
    const seeMoreIconEv = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosIconSearchEv += 12;
      const nextGiftsIconEv = await getGifsByKeyword(API_KEY, initialKeyWordIconEv, offsetGifosIconSearchEv);
      printGifs(nextGiftsIconEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMoreIconEv)
    };
    btnSeeMoreGifos.style.display = "block";
  });

}
// Print tags trendings topics 
const printTagsTrendTopic = async (tags) => {
  for (let i = 0; i <= 0; i++) {
    const containerTrendingTopics = document.createElement("div");
    containerTrendingTopics.classList.add("containerTrendingTopics");
    containerTrendingTopics.innerHTML = `
    <div class="firstContainerTrendTopics">
      <p class="trendigTopics tt1">${tags.data[i].charAt(0).toUpperCase() + tags.data[i].slice(1)}</p><p>,</p>
      <p class="trendigTopics tt2">${tags.data[i + 1].charAt(0).toUpperCase() + tags.data[i + 1].slice(1)}</p><p>,</p>
    </div>
    <div class="secondContainerTrendTopics">
      <p class="trendigTopics tt3">${tags.data[i + 2].charAt(0).toUpperCase() + tags.data[i + 2].slice(1)}</p><p>,</p>
      <p class="trendigTopics tt4">${tags.data[i + 3].charAt(0).toUpperCase() + tags.data[i + 3].slice(1)}</p><p> y </p>
      <p class="trendigTopics tt5">${tags.data[i + 4].charAt(0).toUpperCase() + tags.data[i + 4].slice(1)}</p>
    </div>`;
    containerTrending.appendChild(containerTrendingTopics);
  };

  const tt1 = document.querySelector('.tt1');
  tt1.addEventListener("click", async (ev) => {
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const input = inputUserValue;
    input.value = ev.target.textContent;
    lableIconSearch.style.color = "#9CAFC3";
    newLableClose.style.display = "inline";
    newLableClose.style.order = "2";
    inputUserValue.style.order = "1";
    const initialGifsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
    if (ev.target.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      newtitleSearch.textContent = inputUserValue.value;
      containerTitleSearch.appendChild(newLineSpaceSearch);
      containerTitleSearch.appendChild(newtitleSearch);
      containerTitleSearch.style.display = "block";
      containerGifsSearch.style.display = "grid";
      printGifs(initialGifsTrendTopEv);
    };

    // Pagination
    const seeMore = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosTrendTopEv += 12;

      const nextGiftsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
      printGifs(nextGiftsTrendTopEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMore)
    };
    btnSeeMoreGifos.style.display = "block";
  });
  const tt2 = document.querySelector('.tt2');
  tt2.addEventListener("click", async (ev) => {
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const input = inputUserValue;
    input.value = ev.target.textContent;
    lableIconSearch.style.color = "#9CAFC3";
    newLableClose.style.display = "inline";
    newLableClose.style.order = "2";
    inputUserValue.style.order = "1";
    const initialGifsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
    if (ev.target.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      newtitleSearch.textContent = inputUserValue.value;
      containerTitleSearch.appendChild(newLineSpaceSearch);
      containerTitleSearch.appendChild(newtitleSearch);
      containerTitleSearch.style.display = "block";
      containerGifsSearch.style.display = "grid";
      printGifs(initialGifsTrendTopEv);
    };

    // Pagination
    const seeMore = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosTrendTopEv += 12;

      const nextGiftsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
      printGifs(nextGiftsTrendTopEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMore)
    };
    btnSeeMoreGifos.style.display = "block";
  });
  const tt3 = document.querySelector('.tt3');
  tt3.addEventListener("click", async (ev) => {
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const input = inputUserValue;
    input.value = ev.target.textContent;
    lableIconSearch.style.color = "#9CAFC3";
    newLableClose.style.display = "inline";
    newLableClose.style.order = "2";
    inputUserValue.style.order = "1";
    const initialGifsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
    if (ev.target.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      newtitleSearch.textContent = inputUserValue.value;
      containerTitleSearch.appendChild(newLineSpaceSearch);
      containerTitleSearch.appendChild(newtitleSearch);
      containerTitleSearch.style.display = "block";
      containerGifsSearch.style.display = "grid";
      printGifs(initialGifsTrendTopEv);
    };

    // Pagination
    const seeMore = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosTrendTopEv += 12;

      const nextGiftsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
      printGifs(nextGiftsTrendTopEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMore)
    };
    btnSeeMoreGifos.style.display = "block";
  });
  const tt4 = document.querySelector('.tt4');
  tt4.addEventListener("click", async (ev) => {
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const input = inputUserValue;
    input.value = ev.target.textContent;
    lableIconSearch.style.color = "#9CAFC3";
    newLableClose.style.display = "inline";
    newLableClose.style.order = "2";
    inputUserValue.style.order = "1";
    const initialGifsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
    if (ev.target.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      newtitleSearch.textContent = inputUserValue.value;
      containerTitleSearch.appendChild(newLineSpaceSearch);
      containerTitleSearch.appendChild(newtitleSearch);
      containerTitleSearch.style.display = "block";
      containerGifsSearch.style.display = "grid";
      printGifs(initialGifsTrendTopEv);
    };

    // Pagination
    const seeMore = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosTrendTopEv += 12;

      const nextGiftsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
      printGifs(nextGiftsTrendTopEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMore)
    };
    btnSeeMoreGifos.style.display = "block";
  });
  const tt5 = document.querySelector('.tt5');
  tt5.addEventListener("click", async (ev) => {
    const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
    const input = inputUserValue;
    input.value = ev.target.textContent;
    lableIconSearch.style.color = "#9CAFC3";
    newLableClose.style.display = "inline";
    newLableClose.style.order = "2";
    inputUserValue.style.order = "1";
    const initialGifsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
    if (ev.target.value === "") {
      searchEmptyMsg();
      btnSeeMoreGifos.style.display = "none";
    } else {
      newtitleSearch.textContent = inputUserValue.value;
      containerTitleSearch.appendChild(newLineSpaceSearch);
      containerTitleSearch.appendChild(newtitleSearch);
      containerTitleSearch.style.display = "block";
      containerGifsSearch.style.display = "grid";
      printGifs(initialGifsTrendTopEv);
    };

    // Pagination
    const seeMore = async (ev) => {
      const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
      offsetGifosTrendTopEv += 12;

      const nextGiftsTrendTopEv = await getGifsByKeyword(API_KEY, input.value, offsetGifosTrendTopEv);
      printGifs(nextGiftsTrendTopEv);
    };

    const btnSeeMoreGifos = document.querySelector(".btnSeeMoreGifos");
    if (btnSeeMoreGifos) {
      btnSeeMoreGifos.addEventListener("click", seeMore)
    };
    btnSeeMoreGifos.style.display = "block";
  });
}

// Global const
const containerSuggestions = document.querySelector(".containerAutocomplete");
const containerGifsSearch = document.querySelector(".containerGifsSearch");
const lineSpaceSuggestion = document.querySelector(".lineSearchSuggestions");
const inputUserValue = document.querySelector(".inputTextSearch");
const lableIconSearch = document.querySelector(".search");
const containerTrending = document.querySelector(".containerTrending");


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




document.addEventListener('DOMContentLoaded', async () => {
  const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
  inputUserValue.addEventListener("keyup", getSuggestionsHandler);
  newLableClose.addEventListener("click", closeModal);
  const suggestionsTrendTopics = await getSuggestionsTrendings(API_KEY);
  printTagsTrendTopic(suggestionsTrendTopics);
});



// Get Gifs Search
const getSearchGifsByKeyword = async (apiKey, keyword, offsetGifos) => {
  const API_URL = "https://api.giphy.com/v1/gifs/search";
  const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
  try {
    const tags = await fetch(
      `${API_URL}?api_key=${API_KEY}&q=${keyword}&limit=12&offset=${offsetGifos}`
    );
    return tags.json();
  } catch (error) {
    console.log("ocurrio un error", error);
  }
};

// Get 5 suggestions on input
const getSearchTags = async (apiKey, query) => {
  const API_URL = "https://api.giphy.com/v1/gifs/search/tags";
  const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
  try {
    const tags = await fetch(`${API_URL}?api_key=${API_KEY}&q=${query}&limit=5`);
    return tags.json();
  } catch (error) {
    console.log("ocurrio un error", error);
  }
};

const getGifsByKeyword = async (apiKey, keyword, offset) => {
  const gifs = await getSearchGifsByKeyword(apiKey, keyword, offset);
  return gifs;
}

// Trending Section
const getGifos = async (trendingGifsUrl, apikey, offsetTrendingGifos) => {
  try {
    const gifos = await fetch(`${trendingGifsUrl}&api_key=${apikey}&offset=${offsetTrendingGifos}`);
    return gifos.json();
  } catch (error) {
    console.log('ocurrió un error', error);
  }
}



let offsetTrendingGifos = 3;
// handler callback
document.addEventListener('DOMContentLoaded', async () => {

  const API_URL = 'https://api.giphy.com/v1/gifs/trending?&random_id=e826c9fc5c929e0d6c6d423841a282aa&rating=g';
  const API_KEY = "W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I";
  const gifosData = await getGifos(API_URL, API_KEY, offsetTrendingGifos);

  initFavorites(gifosData);
  printGifosSliderGallery(gifosData, sliderGallery);

  inputUserValue.addEventListener("keyup", getSuggestionsHandler);
  newLableClose.addEventListener("click", closeModal);

  printFavorites();


  // Right
  const carrouselRight = (ev) => {
    offsetTrendingGifos += 3
    sliderGallery++;
    printGifosSliderGallery(gifosData.data, sliderGallery);

  };

  // // Left
  // const carrouselLeft = (ev) => {
  //   offsetTrendingGifos -= 3
  //   printGifosSliderGallery(getGifos(API_URL, API_KEY, offsetTrendingGifos));
  // };

  // document.querySelector(".leftBtn").addEventListener("click", carrouselLeft);
  document.querySelector(".rightBtn").addEventListener("click", carrouselRight);
});






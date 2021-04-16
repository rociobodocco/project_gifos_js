// Trending Section
const getGifos = async (trendingGifsUrl) => {
  try {
    const gifos = await fetch(trendingGifsUrl)
    return gifos.json();
  } catch (error) {
    console.log('ocurrió un error', error);
  }
}



// handler callback
document.addEventListener('DOMContentLoaded', async () => {
  const API_URL = 'https://api.giphy.com/v1/gifs/trending?api_key=W7yxLc2XnPExjexSDj5c7HT1JVgjfL4I&random_id=e826c9fc5c929e0d6c6d423841a282aa&rating=g';
  const gifosData = await getGifos(API_URL);
  
  initFavorites(gifosData);
  trendingToArr(gifosData);
  gifosSliderGallery(gifosData);

  inputUserValue.addEventListener("keyup", getSuggestionsHandler);
  newLableClose.addEventListener("click", closeModal);
});






document.addEventListener('DOMContentLoaded', () => {
    const localMyGifs = JSON.parse(localStorage.getItem('myGifos'));
    console.log(localMyGifs)
    const urlsNewGifos = localMyGifs.map(id => `https://i.giphy.com/${id}.gif`);
    const gifosElements = urlsNewGifos.map(url => {
        const cardMyGifos = document.createElement("div");
        cardMyGifos.classList.add("container-img-mygifos");
        cardMyGifos.innerHTML = `
        <img class="imgMyGifos" src="${url}" alt="imgMyGifos">
        <div class="containerDetails">
            <div class="content-overlay"></div>
            <div class="content-details fadeIn-top fadeIn-left">
                <div class="hoverIcons">
                  <a href="#"><i data-id="${url}" class="far fa-heart btnRemoveFavorites"></i></a>
                  <a href="#" class="btndownload"><i class="fas fa-download"></i></a>
                  <a href="#"><i class="fas fa-expand-alt btnModalExpand"></i></a>
                </div>
                <p class="textCardimg"></p>
                <h6 class="titleCardimg"></h6>
            </div>
            </div>
        </div>`;
        return cardMyGifos;
    });

    gifosElements.forEach(gifo => {
        containerMyGifos.appendChild(gifo);
    });
});

const containerMyGifos = document.querySelector('.containerMyGifos')
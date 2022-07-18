const API_KEY = "3089c191-134f-496b-ac4d-4cb40f4e4561";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
getMovies(API_URL_POPULAR);

async function getMovies (url){
    const resp = await fetch(url, {
headers: {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
},
    });
    const respData = await resp.json();
    showMovies(respData);
}
function getClassByRating(value){
    if (value <6){
        return "red";
    }
    if (value <8){
        return "orange";
    }
    if (value <10){
        return "green";
    }
    else return "green";
}


function showMovies(data){
    const moviesEI = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `  <div class="movie__cover-inner">
       
        <img src="${movie.posterUrlPreview}" 
        class="movie__cover"
        alt="${movie.nameRu}">
        <div class="button">
        <div class="btnD">
        <button id="show-modal" class="btn info">Подробнее</button>
           </div>
           <div class="btnD">
           <button id="show-modal" class="btn">Удалить</button>
           </div>
        </div>
        <div class="movie__cover--darkened">
       </div>
    </div>
    <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
            )}</div>
            ${movie.rating && (`
        <div class="movie__average movie__average--${getClassByRating(movie.rating)  
        }">${movie.rating}</div>
                </div>
                
           ` )
    }
    </div>`;
        moviesEI.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = search.value;
    const apiSearchUrl = `${API_URL_SEARCH}${input}`;
  if(input){
   getMovies(apiSearchUrl);
   search.value = "";
  }    
});
const info = document.querySelector(".info");
var modal = modal({
    title: 'Текст заголовка',
    content: '<p>Содержимое модального окна...</p>',
    footerButtons: [
      { class: 'btn btn__cancel', text: 'Отмена', handler: 'modalHandlerCancel' },
      { class: 'btn btn__ok', text: 'ОК', handler: 'modalHandlerOk' }
    ]
  });
  info.addEventListener("click", (event) => {
    event.preventDefault();
   // modal.open();
    modal.show();
    alert("Показать модальное окно");
    });
  
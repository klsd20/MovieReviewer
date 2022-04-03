var main = document.querySelector("#main");

const api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cb22a275df2167ad963089e321e0d42e&page=1";
const searchApi =
  'https://api.themoviedb.org/3/search/movie?api_key=cb22a275df2167ad963089e321e0d42e&query="';
const imageapi = "https://image.tmdb.org/t/p/w1280";
const form = document.querySelector(".form");
const search = document.querySelector(".search");
function getdata(api) {
  fetch(api)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getmoviedata(data.results);
    });
}
getdata(api);

function getmoviedata(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
   
    <img src="${imageapi + movie.poster_path}" alt="${movie.title}" />
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <span class="${getcolor(movie.vote_average)}">${movie.vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${movie.overview}
    </div>
  `;
    main.appendChild(movieEl);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getdata(searchApi + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function getcolor(e) {
  if (e >= 8) {
    return "green";
  } else if (e >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

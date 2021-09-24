$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    // console.log(searchText);
    getAnime(searchText);

    e.preventDefault();
  });
});

// fetchin using axios
function getAnime(text) {
  axios
    .get("https://api.aniapi.com/v1/anime/?title=" + text)
    .then((res) => {
      let animes = res.data.data.documents;
      console.log(animes);
      let output = "";

      $.each(animes, (index, anime) => {
        output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${anime.cover_image}" />
            <h5>${anime.titles.en}</h5>
            <p><a href="${anime.trailer_url}" target="_blank">Watch Trailer</a></p>
            <a onclick="animeSelected(${anime.id})" class="btn btn-primary" href="#">Movies Details</a>
          </div>
        </div>
        `;
      });
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function animeSelected(id) {
  console.log(id);
  // pass data from one page to another usign sessionStorage
  sessionStorage.setItem("animeId", id);
  window.location = "/anime-search-web-app/html/anime.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("animeId");
  console.log(movieId);
  axios
    .get("https://api.aniapi.com/v1/anime/" + movieId)
    .then((res) => {
      let movie = res.data.data;
      console.log(movie);
      let output = `
        <div class="row">
          <div class="col-md-4">
              <img src="${movie.cover_image}">
          </div>
          <div class="col-md-8">
              <h2>${movie.titles.en}</h2>
              <ul class="list-group py-3">
                  <li class="list-group py-2"><strong>Genre:</strong>${movie.genres}</li>
                  <li class="list-group py-2"><strong>Descriptions:</strong>${movie.descriptions.en}</li>
                  <li class="list-group py-2"><strong>Score:</strong>${movie.score} </li>
                  <li class="list-group py-2"><strong>Season Year:</strong>${movie.season_year} </li>
                  <li class="list-group py-2"><strong>No. of Episodes:</strong>${movie.episodes_count}</li>
                  <li class="list-group py-2"><a href="${movie.trailer_ur}" target="_blank" class="btn btn-primary">View Trailer</a></li>
                  <li class="list-group py-2"><a href="/anime-search-web-app/html/home.html" class="btn btn-warning">Go Back to Search</a></li>
              </ul>
          </div>
        </div>
        `;

      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

// comments - firebase adding

const form = document.getElementById("comments");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.name.value && form.comment.value) {
    db.collection("comments").add({
      name: form.name.value,
      comment: form.comment.value,
    });
    form.name.value = "";
    form.comment.value = "";
  } else {
    alert("Input field cannot be an empty");
  }
});

// let bodyCard = document.getElementById("cardBody");
const div = document.getElementById("cont");

console.log(div);
const renderList = (doc) => {
  let main_div = document.createElement("div");
  let card_body = document.createElement("div");
  let name = document.createElement("h5");
  let comment = document.createElement("p");
  main_div.setAttribute("class", "card mt-3");
  card_body.setAttribute("class", "card-body");
  name.setAttribute("class", "card-title");
  name.textContent = doc.data().name;
  comment.setAttribute("class", "card-text");
  comment.textContent = doc.data().comment;
  card_body.appendChild(name);
  card_body.appendChild(comment);
  main_div.appendChild(card_body);
  div.appendChild(main_div);
};

// reading data from the db

// console.log(bodyCard);
db.collection("comments").onSnapshot((snap) => {
  let changes = snap.docChanges();
  changes.forEach((change) => {
    if (change.type == "added") {
      console.log(change.doc.data());
      renderList(change.doc);
      // let cardbody = `
      // <div class="card-body" >
      //   <h5 class="card-title">Arafat</h5>
      //   <p class="card-text">${change.doc.name}</p>
      // </div>

      //   `;
      // bodyCard.appendChild(cardbody);
    }
  });
});

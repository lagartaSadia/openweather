const API_KEY_FORECAST = "a698168853c8d391d9f68e0e0b8f5b58";
const API_KEY_GIPHY = "X5BgOScTCzcvxmj68huYhrP7jwGurgb6";
const searchButton = document.getElementById("search-button");

window.addEventListener("onload", getGif("cat city"));

searchButton.addEventListener("click", () => {
  const cityName = document.getElementById("search-box").value.toUpperCase();

  forecast(cityName);
});

function forecast(cityName, country) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY_FORECAST}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.cod == "404") alert(data.message);
      else {
        console.log(data);
        getGif(data["weather"][0]["main"]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getGif(weatherDescription) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${weatherDescription}&api_key=${API_KEY_GIPHY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((gif) => {
      document.body.appendChild(populateImage(gif));
    })
    .catch((err) => {
      console.log(err);
    });
}

function populateImage(gif) {
  const img = document.createElement("img");
  img.src = gif["data"]["images"]["original"]["url"];
  return img;
}

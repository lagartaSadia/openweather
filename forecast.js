const API_KEY_FORECAST = "a698168853c8d391d9f68e0e0b8f5b58";
const API_KEY_GIPHY = "X5BgOScTCzcvxmj68huYhrP7jwGurgb6";
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  let userEntry = document.getElementById("city-name");
  const data = userEntry.value.toUpperCase().split(", ");

  forecast(data[0], data[1]);
  userEntry.value = "";
});

function forecast(cityName, country) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${country}&units=metric&cnt=7&appid=${API_KEY_FORECAST}`
  )
    .then((res) => {
      return res.json();
    })
    .then((weather) => {
      if (weather.cod == "404") alert(weather.message);
      else {
        console.log(weather);
        getGif(weather);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getGif(weather) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${weather["list"][0]["weather"]["main"]}&api_key=${API_KEY_GIPHY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

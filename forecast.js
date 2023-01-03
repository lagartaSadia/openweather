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
  const weatherNow = weather["list"][0]["weather"][0]["main"];
  const iconHeader = document.getElementById("icon-header");
  fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${weatherNow}&api_key=${API_KEY_GIPHY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((gif) => {
      console.log(gif);
      iconHeader.src = gif["data"]["images"]["original"]["url"];
    })
    .catch((err) => {
      console.log(err);
    });
}

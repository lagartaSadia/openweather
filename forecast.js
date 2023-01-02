const API_KEY = "a698168853c8d391d9f68e0e0b8f5b58";
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  let userEntry = document.getElementById("city-name");
  const data = userEntry.value.toUpperCase().split(", ");

  forecast(data[0], data[1]);
  userEntry.value = "";
});

function forecast(cityName, country) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((weather) => {
      if (weather.length == 0) console.log("City not found!");
      else console.log(weather);
    })
    .catch((err) => {
      console.log(err);
    });
}

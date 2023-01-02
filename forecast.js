const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  let cityName = document.getElementById("city-name").value;

  forecast(cityName);
});

function forecast(cityName) {
  const API_KEY = "a698168853c8d391d9f68e0e0b8f5b58";

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const cities = data.filter((city) => city.name == cityName);
      if (cities.length == 0) console.log("City not found!");
      else cities.forEach((city) => console.log(`${city.lat} - ${city.lon}`));
    })
    .catch((err) => {
      console.log(err);
    });
}

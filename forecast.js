const API_KEY = "a698168853c8d391d9f68e0e0b8f5b58";
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  let cityName = document.getElementById("city-name").value;

  geolocation(cityName);
});

function geolocation(cityName) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const cities = data.filter((city) => city.name == cityName);
      if (cities.length == 0) console.log("City not found!");
      else forecast(cities);
    })
    .catch((err) => {
      console.log(err);
    });
}

function forecast(cities) {
  cities.forEach((city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  });
}

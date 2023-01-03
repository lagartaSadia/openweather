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
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${country}&units=metric&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((weather) => {
      if (weather.cod == "404") alert(weather.message);
      else {
        console.log(weather);
        populateTemplate(weather);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function populateTemplate(weather) {
  const weekWeather = document.querySelector(".week-weather");

  const template = document.getElementsByTagName("template");
  const cardDay = document.querySelector("[data-day]");
  const cardDayTemp = document.querySelector("[data-day-temp]");

  const day = weather["list"][0]["dt-txt"];
  console.log(
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(day)
  );
}

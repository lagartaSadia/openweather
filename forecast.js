const searchButton = document.getElementById("search-button");

window.addEventListener("onload", getGif("cat city"));
window.addEventListener("onload", populateSection());

searchButton.addEventListener("click", () => {
  const cityName = document.getElementById("search-box").value.toUpperCase();

  forecast(cityName);
});

function forecast(cityName) {
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
        const weatherDescription = data["weather"][0]["main"];
        const cityName = data["name"];

        const temp = Math.round(Number(data["main"]["temp"]));
        const humid = data["main"]["humidity"];
        const flTemp = Math.round(Number(data["main"]["feels_like"]));
        getGif(weatherDescription, cityName);
        populateSection(temp, humid, flTemp);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getGif(weatherDescription, cityName = "Cat Town") {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${weatherDescription}&api_key=${API_KEY_GIPHY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((gif) => {
      gif = gif["data"]["images"]["original"]["url"];
      populateArticle(weatherDescription, gif, cityName);
    })
    .catch((err) => {
      console.log(err);
    });
}

function populateArticle(weatherDescription, gif, cityName) {
  const article = document.querySelector("article");
  article.innerHTML = `
      <h1>
        What's the weather right now in <span id="city-name">${cityName}</span>
      </h1>
      <p>${weatherDescription.toUpperCase()}</p>
      <img src="${gif}" alt="${weatherDescription}">
  `;
}

function populateSection(temp = 32, humid = 18, flTemp = 32) {
  const section = document.querySelector("section");
  section.innerHTML = `
  <h2>Weather Info</h2>
  <div>
    <div class="card">
      <div class="weather-info">Temperature</div>
      <div id="wheater-temp">${temp}<span>&deg;</span></div>
    </div>
    <div class="card">
      <div class="weather-info">Humidity</div>
      <div id="wheater-humid">${humid}<span>%</span></div>
    </div>
    <div class="card">
      <div class="weather-info">Fells Like</div>
      <div id="wheater-fl-temp">${flTemp}<span>&deg;</span></div>
    </div>
  </div>
  `;
}

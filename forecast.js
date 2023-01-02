export default function forecast() {
  const API_KEY = "a698168853c8d391d9f68e0e0b8f5b58";
  let cityName = "Joinville";

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.filter((city) => city.name == cityName));
    })
    .catch((err) => {
      console.log(err);
    });
}

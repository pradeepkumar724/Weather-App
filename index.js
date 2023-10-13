let userInput = document.getElementById("useInput");
let button = document.getElementById("button");
let loading = document.getElementById("loading");
let tempareture = document.getElementById("tempareture");
let temparetureSmall = document.getElementById("temparetureSmall");
let min = document.getElementById("min");
let max = document.getElementById("max");
let weatherImage = document.getElementById("weatherImage");
let date = document.getElementById("date");
let humidity = document.getElementById("humidity");
let windEle = document.getElementById("windEle");
let error = document.getElementById("error");
let city = document.getElementById("city");

let newDate = new Date();
let fullMonth = newDate.toLocaleString("default", { month: "long" });
let day = newDate.getDay();
date.textContent = `${fullMonth} ${day}`;

const displayData = (data) => {
  const { main, name, weather, wind } = data;

  loading.classList.add("hidden");
  error.classList.add("hidden");

  city.textContent = name;
  tempareture.textContent = Math.round(main.temp);
  temparetureSmall.textContent = Math.round(main.temp) + "C";
  humidity.textContent = main.humidity + "%";

  windEle.textContent = Math.round(wind.speed) + "Kmph";
  min.textContent = Math.round(main.temp_min);
  max.textContent = Math.round(main.temp_max);

  switch (weather[0].main) {
    case "Clouds":
      return (weatherImage.src = "images/clouds.png");
    case "Clear":
      return (weatherImage.src = "images/clear.png");
    case "Rain":
      return (weatherImage.src = "images/rain.png");
    case "Drizzle":
      return (weatherImage.src = "images/drizzle.png");
    case "Mist":
      return (weatherImage.src = "images/mist.png");
  }
};

let gettingData = (event) => {
  event.preventDefault();
  let userInputValue = userInput.value;

  loading.classList.remove("hidden");

  let doNetworkCall = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInputValue}&appid=d885aa1d783fd13a55050afeef620fcb&units=metric`
      );
      const data = await response.json();
      console.log(data);
      displayData(data);
    } catch (e) {
      error.classList.remove("hidden");
      loading.classList.add("hidden");
    }
  };
  doNetworkCall();
  userInput.value = "";
};

button.addEventListener("click", gettingData);

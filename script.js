let form = document.forms.myForm;
let inputForm = form.elements.city;

form.addEventListener("submit", (e) => {
  function weatherDate() {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        valueForm +
        "&units=metric&APPID=5d066958a60d315387d9492393935c19"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = data.main.temp + "°C";
        document.querySelector(
          ".icon"
        ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.querySelector(".humidity").textContent =
          "Humidity: " + data.main.humidity + "%";
        document.querySelector(".pressure").textContent =
          "Pressure: " + data.main.pressure + "mm";
        document.querySelector(".wind").textContent =
          "Wind: " + data.wind.speed + "mph";
        document.querySelector(".deg").textContent =
          "Direction of the wind: " + data.wind.deg + "deg";
        document.querySelector(".desc").textContent =
          data.weather[0].description;
      });
  }
  let valueForm = inputForm.value;
  weatherDate(valueForm);
  if (inputForm.value) {
    showPopup();
  } else {
    hidePopup();
  }

  e.preventDefault();
});

const div = document.querySelector(".weather");

function showPopup() {
  div.style.display = "block";
  div.classList.add("fadeInclass");
}

function hidePopup() {
  div.classList.remove("fadeInclass");
  setTimeout(function () {
    div.style.display = "none";
  }, 10000);
}

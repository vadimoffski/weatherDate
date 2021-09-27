let form = document.forms.myForm;
let inputForm = form.elements.city;

form.addEventListener("submit", (e) => {
  function weatherDate() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        valueForm +
        "&units=metric&APPID=5d066958a60d315387d9492393935c19"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.querySelector(".city").textContent = data.name;

        let UTC = document.querySelector(".utc");
        //!clock with timezone
        function clockUTC() {
          let timeZone = new Date(new Date().getTime() + data.timezone * 1000);
          let dayOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          let days = timeZone.getUTCDay();
          let time = [
            timeZone.getUTCHours(),
            timeZone.getUTCMinutes(),
            timeZone.getUTCSeconds(),
          ];
          if (time[0] < 10) {
            time[0] = "0" + time[0];
          }
          if (time[1] < 10) {
            time[1] = "0" + time[1];
          }
          if (time[2] < 10) {
            time[2] = "0" + time[2];
          }
          let currentTime = [time[0], time[1], time[2]].join(":");

          UTC.textContent = dayOfWeek[days] + " " + currentTime;
        }
        clockUTC();

        document.querySelector(".temp").textContent = data.main.temp + "°C";
        document.querySelector(
          ".icon"
        ).src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.querySelector(".humidity").textContent =
          "Humidity: " + data.main.humidity + "%";
        document.querySelector(".pressure").textContent =
          "Pressure: " + data.main.pressure + "mm";
        document.querySelector(".wind").textContent =
          "Wind: " + data.wind.speed + "mph";
        document.querySelector(".deg").textContent =
          "Direction of the wind: " + data.wind.deg + "°";
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
  form.reset();
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

//Clock general
window.onload = function () {
  setInterval(function () {
    const seconds = new Date().getSeconds();
    document.getElementById("seconds").innerHTML =
      (seconds < 10 ? "0" : "") + seconds;

    const minutes = new Date().getMinutes();
    document.getElementById("minutes").innerHTML =
      (minutes < 10 ? "0" : "") + minutes;

    const hours = new Date().getHours();
    document.getElementById("hours").innerHTML =
      (hours < 10 ? "0" : "") + hours;
  }, 1000);
};

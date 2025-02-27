function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let emojiElement = document.querySelector("#emoji");

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
    timeElement.innerHTML = formatDate(date);
    emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji" />`;

    getForcast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "3444d6bo8280055eta76fe9ea41a4f47";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function getForcast(city) {
    let apiKey = "3444d6bo8280055eta76fe9ea41a4f47";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForcast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];

    return days[date.getDay()];
}

function displayForcast(response) {
    console.log(response.data);

    let forcastElement = document.querySelector("#forcast");

    let forcastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forcastHtml =
                forcastHtml +
                `
     <div class="weather-forcast-day">
                        <div class="weather-forcast-date">${formatDay(
                            day.time
                        )}</div>
                        <div class="weather-forcast-emoji">
                          <img src="${day.condition.icon_url}" />
                        </div>
                        <div class="weather-forcast-temps">
                            <div class="weather-forcast-temp">
                                <strong>${Math.round(
                                    day.temperature.maximum
                                )}º </strong>
                            </div>
                            <div class="weather-forcast-temp">${Math.round(
                                day.temperature.minimum
                            )}º</div>
                        </div>
                    </div>`;
        }
    });

    forcastElement.innerHTML = forcastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

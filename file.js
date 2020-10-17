let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const today = new Date();

for (let i = 0; i < 7; i += 1) {
    // Создаем экземпляр класса Date (т.е. создаем новые объект, это одно и тоже), который
    // так как мы не указали никаких параметров для Date, представляет сегодняшний день
    let day = new Date(); // тоже самое, что и today на этом шаге
    day.setDate(today.getDate() + i);

    // Альтернативное решение:
    // const nextDayDate = today.getDate() + 1;
    // today.setDate(nextDayDate);

    // Сначала, строчка в бектиках, вычисляется (на первом шаге - '0', на втором - '1', т.д.)
    // Метод document.getElementById() находит нам элемент с указанным id-шником
    const element = document.getElementById(`${i}`); // document.getElementById(0)

    // В зависимости от того, какое значение вернет getDay() - 0 (Sunday), 1 (Monday) ...
    // мы прочитаем элемент из массива weekday с соответствующим индексом
    const dayName = weekdays[day.getDay()];

    element.textContent = `${dayName}` + ' - ' + `${day.getDate()}`;
};

// ПРОВЕРКА ПОДДЕРЖКИ ГЕОЛОКАЦИИ БРАУЗЕРОМ
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    alert('местоположение НЕ доступно');
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Adkham, Browser doesn't Support Geolocation</p>";
}

//ОПРЕДЕЛЕНИЕ МЕСТОПОЛОЖЕНИЯ ПОЛЬЗОВАТЕЛЯ
function success(position) {
    let crd = position.coords;
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    getWeather(latitude, longitude);
}

function error(err) {
    alert("Ошибка, местоположение не установлено");
}

// SELECTED ELEMENTS
const KELVIN = 273;
const key = "f8373d094efa892df25648ff315317b7";
const userLocation = document.querySelector('.user-location p');
const weatherIcon = document.querySelector('.weather-icon');
const weatherInfo = document.querySelector('.weather-info p');
const weatherValue = document.querySelector('.weather-value p');
const notificationElement = document.querySelector('.notification');

// СОЗДАЕМ ОБЪЕКТ В КОТОРЫЕ БУДЕМ ДОБАВЛЯТЬ ДАННЫЕ
const weather = {};

// SETTING WEATHER DATA IN DAYS OF THE WEEK
let buttons = document.querySelector('.dws');

buttons.onclick = function(eve) {
    let dayOrderNumber = eve.target.id;
    const currentDay = new Date();

    const nowaday = new Date();
    nowaday.setDate(currentDay.getDate() + Number(dayOrderNumber));

    let month = String(nowaday.getMonth() + 1).padStart(2, "0");
    let day = String(nowaday.getDate()).padStart(2, "0");
    let dataIso8601 = `${nowaday.getFullYear()}-${month}-${day}`; // 2020-06-30

    displayWeather(weather[dataIso8601]);
}

//ПОЛУЧЕНИЕ ДАННЫХ API ОТ ПРОВАЙДЕРА

function getWeather(latitude, longitude) {
    const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(response => {
            let data = response.json();

            return data;
        })
        .then(function(data){
            let counter = 0;
          
            for(let i = 0; i < 40; i += 8) {
                
                let weatherForOneDay = data.list[i];
                const now = new Date();

                const clickedDayDate = new Date();
                clickedDayDate.setDate(now.getDate() + counter);

                let month = String(clickedDayDate.getMonth() + 1).padStart(2, "0");
                let day = String(clickedDayDate.getDate()).padStart(2, "0");
                const key = `${clickedDayDate.getFullYear()}-${month}-${day}`;

                weather[key] = {};
                weather[key].temperature = {};
                weather[key].temperature.value = Math.floor(weatherForOneDay.main.temp - KELVIN);
                weather[key].description = weatherForOneDay.weather[0].description;
                weather[key].iconId = weatherForOneDay.weather[0].icon;
                weather[key].city = data.city.name;
                weather[key].country = data.city.country;

                counter += 1;
            }
        })
        .then(function(){
            let now = new Date();
            let month = String(now.getMonth() + 1).padStart(2, "0");
            displayWeather(weather[`${now.getFullYear()}-${month}-${now.getDate()}`]);
        });
}

function displayWeather(oneDayWeather) {
    userLocation.innerHTML = `${oneDayWeather.city} - ${oneDayWeather.country}`;
    weatherIcon.innerHTML = `<img src="icons/${oneDayWeather.iconId}.png"/>`
    weatherInfo.innerHTML = oneDayWeather.description;
    weatherValue.innerHTML = `${oneDayWeather.temperature.value}°<span>C</span>`;
}


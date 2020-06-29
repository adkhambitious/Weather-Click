// DATA

// Get DAY of the Week

let today = new Date(); // { getDate() { ... }, getDay() { ... }, ... }
const person = {
    name: 'Vitaly',
    setName: function (value) {
        this.name = value;
    },
};
person.name = 'Jordan';
person.setName('Jordan');

let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

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
    const element = document.getElementById(`${i}`);// document.getElementById(0)

    // В зависимости от того, какое значение вернет getDay() - 0 (Sunday), 1 (Monday) ...
    // мы прочитаем элемент из массива weekday с соответствующим индексом
    const dayName = weekday[day.getDay()];

    // Зависываем внутрь html элемента соответствующую информацию

        // if (i = 0) {
        //     document.getElementById(`${i}`).textContent = `<strong>${dayName} - ${day.getDate()}</strong>`;
        //     break;
        // }
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


// ЦИКЛ ДЛЯ ОПРЕДЕЛЕНИЯ ПОГОДЫ НА ДРУГИЕ ДНИ
// let nowadays = new Date().getTime();
// let newDay = [];
// for (let i = 0; i < 8; i += 1) {
//     if (i = 0) {
//         newDay[i] = nowadays/1000;
//         const element = document.getElementById(`${i}`);
//         break;
//     }
//     newDay[i] = nowadays/1000 + 86400;
//     const
// }
// SETTING WEATHER DATA IN DAYS OF THE WEEK
let count;
let buttons = document.getElementById('dws');

buttons.onclick = function(eve) {
    count = eve.target.id;
    console.log(typeof(count));
    const nowaday = new Date();
    const currentDay = new Date();
    nowaday.setDate(currentDay.getDate() + Number(count));
    console.log(nowaday);
    let month = String(nowaday.getMonth() + 1).padStart(2, "0");
    console.log(month);
    let day = String(nowaday.getDate()).padStart(2, "0")
    let temp = `${nowaday.getFullYear()}-${month}-${day}`; // 2020-06-30
    console.log(temp);
    displayWeather(weather[temp]);
}

//ПОЛУЧЕНИЕ ДАННЫХ API ОТ ПРОВАЙДЕРА
let counter = 0;
    function getWeather(latitude, longitude) {
        const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
        // let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
            fetch(api)
                .then(response => {
                    console.log(response);
                    let data = response.json();
                    return data;
                })
                .then(function(data){
                    for(let i = 0; i < 40; i += 8) {

                        let weatherForOneDay = data.list[i];
                        console.log(weatherForOneDay);
                            // -> weatherForOneDay = data.list[0];
                            // -> weatherForOneDay = { ... };

                        const clickedDayDate = new Date();
                            // clickedDayDate = { date, month, year, setDate(nextDate) { this.date = nextDate }}
                        const now = new Date();
                        clickedDayDate.setDate(now.getDate() + counter);
                        console.log(clickedDayDate);
                        let month = String(clickedDayDate.getMonth() + 1).padStart(2, "0");
                        let day = String(clickedDayDate.getDate()).padStart(2, "0");
                        const key = `${clickedDayDate.getFullYear()}-${month}-${day}`;
                        console.log(key);
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
        console.log(oneDayWeather);
        userLocation.innerHTML = `${oneDayWeather.city} - ${oneDayWeather.country}`;
        weatherIcon.innerHTML = `<img src="icons/${oneDayWeather.iconId}.png"/>`
        weatherInfo.innerHTML = oneDayWeather.description;
        weatherValue.innerHTML = `${oneDayWeather.temperature.value}°<span>C</span>`;
    }


// Нажатие на день недели
// let button = document.getElementById('dws');
// let selectedA;
//     button.onclick = function(event) {
//         let target = event.target; // где был клик?

//         while (target != this) {
//             if (target.tagName == 'A') {
//                 highlight(target); // подсветить a
//                 return;
//             }
//             target = target.parentNode;    // не на a? тогда возвращаем родителя текущего элемента
//         }
//     }

//     function highlight(node) {
//         if (selectedA) { // убрать существующую подсветку, если есть
//           selectedA.classList.remove('highlight');
//         }
//         selectedA = node;
//         selectedA.classList.add('highlight'); // подсветить новый A
//     }

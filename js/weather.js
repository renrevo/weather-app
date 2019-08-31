let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
let apiKey = '&appid=3492d471aae7d96ded83eba070532b16';
let unit = '&units=metric';

let cityTemp = document.getElementById('city-temp');
let cityName = document.getElementById('city-name');
let humidityLevel = document.getElementById('humidity-level');
let minTemp = document.getElementById('min-temp');
let maxTemp = document.getElementById('max-temp');
let icon = document.getElementById('icon');


let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', findWeatherDetails);
searchInput.addEventListener('keyup', findWeatherDetailsClick);

function findWeatherDetailsClick(event) {
    if (event.keyCode === 13) {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === '') {
        cityName.textContent = 'Enter Valid City';
        cityTemp.textContent = 0;
        humidityLevel.textContent = 0;
        minTemp.textContent = 0;
        maxTemp.textContent = 0;
    } else {
        city = searchInput.value;
        let url = baseUrl + city + apiKey + unit;
        APIcall(url);
        if (temperatureUnit[0].textContent === 'K') {
            changeUnit();
        }
    }
}

function changeUnit() {
    if (temperatureUnit[0].textContent === 'K') {
        temperatureUnit.forEach(function (item) {
            item.textContent = 'C'
        });
    } else {
        temperatureUnit.forEach(function (item) {
            item.textContent = 'K'
        });
    }
}

// fetching data from API
function APIcall(url) {
    fetch(url)
        .then(apiResponse => {
            return apiResponse.json();
        })
        .then(data => {
            if (data.cod === 200) {
                const {temp,humidity,temp_min,temp_max} = data.main;
                
                // Updating Dom Elements
                cityTemp.textContent = temp;
                cityName.textContent = data.name + '/' + data.sys.country;
                humidityLevel.textContent = humidity;
                minTemp.textContent = temp_min;
                maxTemp.textContent = temp_max;
                icon.src = 'icons/' + data.weather[0].icon + '.svg';
            } else {
                cityName.textContent = data.message;
                cityTemp.textContent = 0;
                humidityLevel.textContent = 0;
                minTemp.textContent = 0;
                maxTemp.textContent = 0;
            }

        });
}

// Converting the Unit

let changeUnitBtn = document.getElementById('change-unit-btn');
let temperatureUnit = document.querySelectorAll('.unit');
let tempValue = document.querySelectorAll('.js-temp');

changeUnitBtn.addEventListener('click', () => {
    if (cityName.textContent === 'Enter Valid City' || cityName.textContent === 'city not found') {
        cityTemp.textContent = 0;
        humidityLevel.textContent = 0;
        minTemp.textContent = 0;
        maxTemp.textContent = 0;
    } else {
        if (temperatureUnit[0].textContent === 'C') {
            temperatureUnit.forEach(function (item) {
                item.textContent = 'K'
            });
            tempValue.forEach(function (item) {
                item.textContent = parseInt(item.textContent) + 273;
            })
        } else {
            temperatureUnit.forEach(function (item) {
                item.textContent = 'C'
            });
            tempValue.forEach(function (item) {
                item.textContent = parseInt(item.textContent) - 273;
            })
        }
    }

});

// Loding Delhi's weather as default
window.onload = function () {
    city = 'Delhi';
    let url = baseUrl + city + apiKey + unit;
    APIcall(url)
    console.log('%c Console Lover 😊', 'background-color:red;color:white;padding:20px;text-shadow:3px 3px 5px rgba(0, 0, 0, 0.3);font-size:22px;border-radius:5px;font-family: "Montserrat", sans-serif;box-shadow:10px 10px 30px rgba(0, 0, 0, 0.3)')
}

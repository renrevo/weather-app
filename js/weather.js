let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
let apiKey = '&appid=3492d471aae7d96ded83eba070532b16';
let unit = '&units=metric';

let cityTemp = document.getElementById('city-temp');
let cityName = document.getElementById('city-name');
let humidityLevel = document.getElementById('humidity-level');
let minTemp = document.getElementById('min-temp');
let maxTemp = document.getElementById('max-temp');


let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', findWeatherDetails);

function enterPressed(event) {
    findWeatherDetails();
}

function findWeatherDetails() {
    if (searchInput.value === '') {
        cityName.textContent = 'Enter Valid City';
    } else {
        city = searchInput.value;
        let url = baseUrl + city + apiKey + unit;
        APIcall(url);
        changeUnit(); // resetting the unit to Celcius
    }
}
function changeUnit() {
    if (temperatureUnit[0].textContent === 'C') {
        temperatureUnit.forEach(function (item) {
            item.textContent = 'K'
        });
    } else {
        temperatureUnit.forEach(function (item) {
            item.textContent = 'C'
        });
    }
}
function APIcall(url) {
    fetch(url)
        .then(apiResponse => {
            return apiResponse.json();
        })
        .then(data => {
            if (data.cod === 200) {
                const {
                    temp,
                    humidity,
                    temp_min,
                    temp_max
                } = data.main;
                //console.log(data);
                // Updating Dom Elements
                cityTemp.textContent = temp;
                cityName.textContent = data.name;
                humidityLevel.textContent = humidity;
                minTemp.textContent = temp_min;
                maxTemp.textContent = temp_max;
            } else {
                cityName.textContent = data.message;
            }

        });
}

// Converting the Unit

let changeUnitBtn = document.getElementById('change-unit-btn');
let temperatureUnit = document.querySelectorAll('.unit');
let tempValue = document.querySelectorAll('.js-temp');

changeUnitBtn.addEventListener('click', () => {
    if (cityName.textContent === 'Enter Valid City') {
        cityTemp.textContent = "";
        humidityLevel.textContent = '';
        minTemp.textContent = '';
        maxTemp.textContent = '';
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

// Loding delhi weather as default
window.onload = function () {
    city = 'Delhi';
    let url = baseUrl + city + apiKey + unit;
    APIcall(url)
    console.log('%c Console Lover', 'background-color:red;color:white;padding:20px;text-shadow:3px 3px 5px rgba(0, 0, 0, 0.3);font-size:22px;border-radius:5px;font-family: "Montserrat", sans-serif;box-shadow:10px 10px 30px rgba(0, 0, 0, 0.3)')
}
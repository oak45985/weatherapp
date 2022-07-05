var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name")
var stateInputEl = document.querySelector("#city-initials")
var lat = 32.78
var lon = -96.81
var currentDay = [];
var futureDays = [];

var getCityState = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();
    var stateInit = stateInputEl.value.trim();

    if (cityName, stateInit) {
        getLatLong(cityName, stateInit);
        // function to store (cityName) + (stateInit);
        cityInputEl.value = "";
        stateInputEl.value = "";
        console.log(cityName + " is the city you've input. " + stateInit + " is the state you've input.");
        console.log("shit worked!");
    } else {
        alert("please enter shit right.");
        console.log("c'mon fucker");
    }
    
}

var getLatLong = function(cityName, stateInit) {
    // geocoding
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateInit + "&limit=1&appid=7fe9a570ce699e734be31068fc9c9690"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json();
            console.log(response)
        } else {
            console.log("something aint right");
        }
    });
};

var getWeather = function() {

    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&units=standard&appid=7fe9a570ce699e734be31068fc9c9690"

    fetch(apiUrl2).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentDay = data.current;
                futureDays = data.daily;
                displayCurrentDay(currentDay);
                displayFutureDays(futureDays);
                // console.log(JSON.stringify(currentDay) + " " + futureDays);
            });
        } else {
            console.log("something aint right 2");
        }
    });
}

var displayCurrentDay = function(currentDay) {
    // var convertTemp = (1.8 * (currentDay.temp - 273)) + 32;
    console.log(currentDay.temp);
    // var convertWind = currentDay.wind_speed * 2.237;
    console.log(currentDay.wind_speed);
}

var displayFutureDays = function(futureDays) {
    console.log(futureDays[0].temp);
    console.log(futureDays[1].temp);
    console.log(futureDays[2].temp);
}

getWeather();

userFormEl.addEventListener("submit", getCityState);

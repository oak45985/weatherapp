var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name")
var stateInputEl = document.querySelector("#city-initials")
var currentContainerEl = document.querySelector("#current-display")
var dayZeroContainerEl = document.querySelector("#future-display-one")
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
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateInit + ",US&limit=5&appid=7fe9a570ce699e734be31068fc9c9690"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                lat = data[0].lat;
                lon = data[0].lon;
                getWeather(lat, lon, cityName, stateInit);
            });
        }  else {
            console.log("something aint right");
        }
    });
};

var getWeather = function(lat, lon, cityName, stateInit) {

    var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&units=standard&appid=7fe9a570ce699e734be31068fc9c9690"

    fetch(apiUrl2).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                currentDay = data;
                futureDays = data.daily;
                displayCurrentDay(currentDay, cityName, stateInit);
                displayFutureDays(futureDays);
                // console.log(JSON.stringify(currentDay) + " " + futureDays);
            });
        } else {
            console.log("something aint right 2");
        }
    });
}

var displayCurrentDay = function(currentDay, cityName, stateInit) {

    var currentDayNameEl = document.createElement("h2");
    currentDayNameEl.classList = "card-title text-dark";
    // ADD ICON IN TEXTCONTENT BELOW
    currentDayNameEl.textContent = cityName + ", " + stateInit; 
    currentContainerEl.appendChild(currentDayNameEl);

    var currentDayInfoEl = document.createElement("p");
    currentDayInfoEl.classList = "card-title text-dark";
    currentDayInfoEl.innerHTML = "<p class='card-text text-dark'>" 
    + currentDay.current.temp + "°F<br>" 
    + currentDay.current.wind_speed + " MPH<br>"
    + currentDay.current.humidity + "%<br>"
    + "UVI Index: "+ currentDay.current.uvi + "</p>";
    currentContainerEl.appendChild(currentDayInfoEl);

    // // var convertTemp = (1.8 * (currentDay.temp - 273)) + 32;
    // console.log(currentDay.temp + "°F");
    // // var convertWind = currentDay.wind_speed * 2.237;
    // console.log(currentDay.wind_speed + " MPH");
    // console.log(currentDay.humidity + "%");
    // console.log(currentDay.uvi);
}

var displayFutureDays = function(futureDays) {

    var futureDayInfoEl = document.createElement("p");
    futureDayInfoEl.classList = "card-title text-dark";
    futureDayInfoEl.innerHTML = "<p class='card-text text-dark'>" 
    + futureDays[0].temp.day + "°F<br>" 
    + futureDays[0].wind_speed + " MPH<br>"
    + futureDays[0].humidity + "%</p>";
    dayZeroContainerEl.appendChild(futureDayInfoEl);
    console.log(futureDays[0].temp.day + " °F", futureDays[0].wind_speed + " MPH", futureDays[0].humidity + "%");
    console.log(futureDays[1].temp.day + " °F", futureDays[1].wind_speed + " MPH", futureDays[0].humidity + "%");
    console.log(futureDays[2].temp.day + " °F", futureDays[2].wind_speed + " MPH", futureDays[0].humidity + "%");
    console.log(futureDays[3].temp.day + " °F", futureDays[3].wind_speed + " MPH", futureDays[0].humidity + "%");
    console.log(futureDays[4].temp.day + " °F", futureDays[4].wind_speed + " MPH", futureDays[0].humidity + "%");
}

// getWeather();

userFormEl.addEventListener("submit", getCityState);

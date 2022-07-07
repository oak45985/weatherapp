var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");
var stateInputEl = document.querySelector("#city-initials");
var currentContainerEl = document.querySelector("#current-display");
var dayZeroContainerEl = document.querySelector("#future-display-one");
var dayOneContainerEl = document.querySelector("#future-display-two");
var dayTwoContainerEl = document.querySelector("#future-display-three");
var dayThreeContainerEl = document.querySelector("#future-display-four");
var dayFourContainerEl = document.querySelector("#future-display-five");
var btnListEl = document.querySelector("#btn-list");
var currentDay = [];
var futureDays = [];

var getCityState = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();
    var stateInit = stateInputEl.value.trim();

    if (cityName, stateInit) {
        getLatLong(cityName, stateInit);
        cityInputEl.value = "";
        stateInputEl.value = "";
    } else {
        alert("Please enter a City and ST.");
    }
    
}

var getLatLong = function(cityName, stateInit) {
    // geocoding
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateInit + ",US&limit=5&appid=7fe9a570ce699e734be31068fc9c9690"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                lat = data[0].lat;
                lon = data[0].lon;
                getWeather(lat, lon, cityName, stateInit);
                createButton(lat, lon, cityName, stateInit);
            });
        }  else {
            console.log("something aint right");
        }
    });
};

var createButton = function(lat, lon, cityName, stateInit) {

    var cityBtnEl = document.createElement("btn");
    cityBtnEl.classList = "btn btn-secondary";
    cityBtnEl.textContent = cityName + ", " + stateInit;
    btnListEl.appendChild(cityBtnEl);

    var cityStorage = {
        latitude: lat,
        longitude: lon,
    }
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage));

}

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
            console.log("something aint right v2");
        }
    });
}

var displayCurrentDay = function(currentDay, cityName, stateInit) {

    var currentDayNameEl = document.createElement("h2");
    currentDayNameEl.classList = "card-title text-dark";
    // ADD ICON IN TEXTCONTENT BELOW
    currentDayNameEl.textContent = cityName + ", " + stateInit + " (" + moment(new Date()).format("M/D/YY") + ")"; 
    currentContainerEl.appendChild(currentDayNameEl);

    var image = document.createElement("img");

    image.setAttribute (
        "src",
        "http://openweathermap.org/img/wn/" + currentDay.current.weather[0].icon + "@2x.png"
    );

    currentDayNameEl.appendChild(image);

    var currentDayInfoEl = document.createElement("p");
    currentDayInfoEl.classList = "card-title text-dark";
    currentDayInfoEl.innerHTML = "<p class='card-text text-dark'>" 
    + currentDay.current.temp + "°F<br>" 
    + currentDay.current.wind_speed + " MPH<br>"
    + currentDay.current.humidity + "%</p>";
    currentContainerEl.appendChild(currentDayInfoEl);

    var uvIndicatorEl = document.createElement("p")
    if (currentDay.current.uvi < 0) {
        uvIndicatorEl.classList = "badge-pill badge-success col-2 align-middle";
        console.log("yeah")
    } else {
        uvIndicatorEl.classList = "badge-pill badge-warning col-2 align-middle";
        console.log("no")
    };
    uvIndicatorEl.innerHTML = "<span class='pb-2 align-middle'>UV Index: " + currentDay.current.uvi + "</span>";
    // uvIndicatorEl.textContent = "UV Index: " + currentDay.current.uvi;
    currentContainerEl.appendChild(uvIndicatorEl);
}

var displayFutureDays = function(futureDays) {

    var futureDayInfoEl = document.createElement("p");
    futureDayInfoEl.classList = "card-title text-dark";
    futureDayInfoEl.innerHTML = "<h5 class='card-title text-dark'>" + moment(new Date()).add(1, "d").format("M/D/YY") + 
    "<img class=img-fluid max-width: 10%; src=http://openweathermap.org/img/wn/" + futureDays[0].weather[0].icon + "@2x.png></img>"
    + "</h5>"
    + "<p class='card-text text-dark'>" 
    + futureDays[0].temp.day + "°F<br>" 
    + futureDays[0].wind_speed + " MPH<br>"
    + futureDays[0].humidity + "%</p>";
    dayZeroContainerEl.appendChild(futureDayInfoEl);

    var futureDayTwoInfoEl = document.createElement("p");
    futureDayTwoInfoEl.classList = "card-title text-dark";
    futureDayTwoInfoEl.innerHTML = "<h5 class='card-title text-dark'>" + moment(new Date()).add(2, "d").format("M/D/YY") + 
    "<img class=img-fluid max-width: 10%; src=http://openweathermap.org/img/wn/" + futureDays[1].weather[0].icon + "@2x.png></img>"
    + "</h5>"
    + "<p class='card-text text-dark'>" 
    + futureDays[1].temp.day + "°F<br>" 
    + futureDays[1].wind_speed + " MPH<br>"
    + futureDays[1].humidity + "%</p>";
    dayOneContainerEl.appendChild(futureDayTwoInfoEl);

    var futureDayThreeInfoEl = document.createElement("p");
    futureDayThreeInfoEl.classList = "card-title text-dark";
    futureDayThreeInfoEl.innerHTML = "<h5 class='card-title text-dark'>" + moment(new Date()).add(3, "d").format("M/D/YY") + 
    "<img class=img-fluid max-width: 10%; src=http://openweathermap.org/img/wn/" + futureDays[2].weather[0].icon + "@2x.png></img>"
    + "</h5>"
    + "<p class='card-text text-dark'>" 
    + futureDays[2].temp.day + "°F<br>" 
    + futureDays[2].wind_speed + " MPH<br>"
    + futureDays[2].humidity + "%</p>";
    dayTwoContainerEl.appendChild(futureDayThreeInfoEl);

    var futureDayFourInfoEl = document.createElement("p");
    futureDayFourInfoEl.classList = "card-title text-dark";
    futureDayFourInfoEl.innerHTML = "<h5 class='card-title text-dark'>" + moment(new Date()).add(4, "d").format("M/D/YY") + 
    "<img class=img-fluid max-width: 10%; src=http://openweathermap.org/img/wn/" + futureDays[3].weather[0].icon + "@2x.png></img>"
    + "</h5>"
    + "<p class='card-text text-dark'>" 
    + futureDays[3].temp.day + "°F<br>" 
    + futureDays[3].wind_speed + " MPH<br>"
    + futureDays[3].humidity + "%</p>";
    dayThreeContainerEl.appendChild(futureDayFourInfoEl);

    var futureDayFiveInfoEl = document.createElement("p");
    futureDayFiveInfoEl.classList = "card-title text-dark";
    futureDayFiveInfoEl.innerHTML = "<h5 class='card-title text-dark'>" + moment(new Date()).add(5, "d").format("M/D/YY") + 
    "<img class=img-fluid max-width: 10%; src=http://openweathermap.org/img/wn/" + futureDays[4].weather[0].icon + "@2x.png></img>"
    + "</h5>"
    + "<p class='card-text text-dark'>" 
    + futureDays[4].temp.day + "°F<br>" 
    + futureDays[4].wind_speed + " MPH<br>"
    + futureDays[4].humidity + "%</p>";
    dayFourContainerEl.appendChild(futureDayFiveInfoEl);
}

// getWeather();

userFormEl.addEventListener("submit", getCityState);

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name")
var stateInputEl = document.querySelector("#city-initials")

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
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateInit + "&limit=1&appid=7fe9a570ce699e734be31068fc9c9690"

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json();
            console.log(response)
        } else {
            console.log("something aint right");
        }
    });
};

userFormEl.addEventListener("submit", getCityState);

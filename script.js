/*
    -----------------------------------------------------------------------------------------------------
    JS script to get geolocation data and callout to the What3Words API
    Created by University of Hertfordshire student SRN 14184876 (Anonymity required for grading purposes)
    -----------------------------------------------------------------------------------------------------
 */

/*
    Declare variables to hold the latitude, longitude, accuracy and timestamp values
    Create an additional datetime variable for a user readable date time
    Create variables for where the output will be displayed - one for each part of the script
*/
var latitude;
var longitude;
var accuracy;
var timestamp;
var datetime;
var x = document.getElementById("geo");
var y = document.getElementById("words");

/*
    When the page loads, call the getLocation() function required
    getLocation function retrieves geolocation dataand populates the the above variables

    and displays the output on the front end
 */
window.onload = function() {
    getLocation();
    //get3words();
};

/*
    When the user clicks the testButtonWords button, the get3words() function is called
    get3Words function calls out to the What3Words API and retrieves a 3 word code used to identify a location
 */
ButtonWords.onclick = function() {
    get3words();
};

/*
    When the user clicks the testButtonGeo button, the showPosition() function is called
    showPosition displays the geolocation data on the front end
 */
ButtonGeo.onclick = function() {
    showPosition();
};

/*
    -----------------------------
    Callout to request geolocation data
    -----------------------------
*/

//get geolocation data if the browser supports it, otherwise display an error message for this function
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getData);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


//save the geolocation data into variables
    function getData(position) {
        //set values of variables to be those from the geolocation object
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        accuracy = position.coords.accuracy;
        timestamp = position.timestamp;
        //set datetime to be a Date type for the value of timestamp
        datetime = new Date(timestamp);
    }
}

/*
    -----------------------------
    Display geolocation data
    -----------------------------
*/
function showPosition() {
    x.innerHTML =
        //JB code to test
        "Latitude: " + latitude +
        "<br>Longitude: " + longitude +
        "<br>Location Accuracy: " + accuracy + "m" +
        "<br>Request Date: " + datetime.toUTCString();    //convert the original unix timestamp to a user readable date time value
}


/*
    --------------------------
    Callout to What3Words API
    --------------------------
 */

//callout to the API, parse the JSON response into a JS object array and display relevant values
function get3words() {

// declare a new request variable
    var request = new XMLHttpRequest();
    var w3wKey = "U4YS2DD5";
    //var w3wUrl = new URL;

    var w3wUrl = "https://api.what3words.com/v3/convert-to-3wa?coordinates=" + latitude + "%2C" + longitude + "&key=" + w3wKey;

    /*
    Connect to the URL of the API using the URL provided on page https://developer.what3words.com/public-api/docs#overview
    Include API key and use the GET method as suggested
    */
    //request.open('GET', 'https://api.what3words.com/v3/convert-to-3wa?coordinates=51.521251%2C-0.203586&key=U4YS2DD5', true);
    //request.open('GET', 'https://api.what3words.com/v3/convert-to-3wa?coordinates=52.983128%2C-1.997361&key=U4YS2DD5', true);
    request.open('GET',  w3wUrl);

    request.onload = function () {
        /*
        When the request loads, get the data
        The returned data from the What3Words API is in JSON so create a gelocationData variable to hold the data
        The JSON.parse function converts the data to an array of JS objects
        */
        var geolocationData = JSON.parse(this.response);

        /*
        Display the data
        Return the relevant value of words from the array and display it in the JS_test page
         */
        //document.getElementById("test").innerHTML = geolocationData.words;
        y.innerHTML = geolocationData.words;
    };

//Send request
    request.send();

}
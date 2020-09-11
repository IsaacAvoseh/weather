if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}




// Access DOM elements
window.addEventListener("load", () =>{
const reportSection = document.getElementById('weather-report');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');

container.classList.remove("rainyday", "cloudyday", "clearday");


// Prepare openweathermap.org request
let apiRequest = new XMLHttpRequest();
apiRequest.onreadystatechange = () => {
  if (apiRequest.readyState === 4) {
    if (apiRequest.status === 404) {
      reportSection.style.color = 'red';
       return reportSection.textContent = "City Not Found!";
    }
    const response = JSON.parse(apiRequest.response);
    reportSection.textContent = 'The weather in ' + response.name + ' is ' + response.weather[0].main + '.';

    container.classList.remove("rainyday", "cloudyday", "clearday")

    if (response.weather[0].main.includes("Rain")) {
      container.classList.add("rainyday")
    } else if (response.weather[0].main.includes("Cloud")) {
      container.classList.add("cloudyday")
    } else {
      container.classList.add("clearday");
    }
  
  }
};

document.getElementById("city").value = 'New York';

/* 
 * Capture and handle form submit event
 * Prevent default behaviour, prepare and send API request
*/
cityForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  container.classList.remove("rainyday", "cloudyday", "clearday");

  const chosenCity = cityInput.value;
  apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=677b0f602f20d710754ced87f9e9bd49');
  apiRequest.send();



});

})


// Write a local item..
const cityInput = document.getElementById('city');
localStorage.setItem('city', 'input');

// Read a local item..
var theItemValue = localStorage.getItem(cityInput, "weather");

// Check for changes in the local item and log them..
window.addEventListener('storage', function(event) {
  aside.textContent = weather;
    console.log('The value for ' + event.key + ' was changed from' + event.oldValue + ' to ' + event.newValue);
} , false);

// Check for HTML5 Storage..
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}


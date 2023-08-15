// import Triangle from './js/triangle.js';
// import Rectangle from './js/rectangle.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getBikes(location) {
  let request = new XMLHttpRequest();

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printBikes(response);
    } else {
      printError(this, response, location);
    }
  });

  const url = `https://bikeindex.org:443/api/v3/search?location=${location}&distance=3&stolenness=proximity`;
  request.open("GET", url, true);
  request.send();
}

function printBikes(response) {
  const array = response.bikes;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const date = new Date(element.date_stolen * 1000);
    const bike = document.createElement('li');
    bike.append(`${element.stolen_location} ${date} ${element.title}`);
    document.querySelector('ol').append(bike);
  }
}

function printError(request, response, location) {
  document.querySelector('p').innerText = `There was an error accessing the weather data for ${location}: ${request.status} ${request.statusText}: ${response.error}`;
}

function handleForm(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getBikes(location);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleForm);
});
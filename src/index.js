import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getBikes(location) {
  let request = new XMLHttpRequest();

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printBikes(response, location);
    } else {
      printError(this, response, location);
    }
  });

  const url = `https://bikeindex.org:443/api/v3/search?per_page=100&location=${location}&distance=3&stolenness=proximity`;
  request.open("GET", url, true);
  request.send();
}

function printBikes(response, location) {
  const array = response.bikes;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const date = new Date(element.date_stolen * 1000);
    if (Date.now() - date.valueOf() <= 2.628e+9) {
      const bike = document.createElement('li');
      const br = document.createElement('br');
      const link = document.createElement('a');
      let colors = '';
      element.frame_colors.forEach(element => {
        colors = `${colors}${element}, `;
      });
      colors = colors.slice(0, colors.length - 2);
      bike.innerText = `${element.title}
        Date stolen: ${date}
        Location: ${element.stolen_location}
        Description: ${element.description}
        Model: ${element.frame_model}
        Manufacturer: ${element.manufacturer_name}
        Year: ${element.year}
        Color(s): ${colors}
        Serial number: ${element.serial}
        Link: `;
      link.setAttribute('href', element.url);
      link.innerText = element.url;
      bike.append(link);
      // code below adds bike thumbnail to results
      // if (element.thumb != null) {
      //   const img = document.createElement('img');
      //   img.setAttribute('src', `${element.thumb}`);
      //   bike.prepend(img);
      // }
      document.querySelector('ol').append(bike);
      document.querySelector('ol').append(br);
    }
  }
  if (document.querySelector('ol').innerText === '') {
    document.querySelector('p').innerText = `No bikes stolen in the past month in or near ${location}.`;
  }
  else {
    const br = document.createElement('br');
    document.querySelector('p').prepend(`Bikes stolen in the past month in or near ${location}:`);
    document.querySelector('p').append(br);
  }
}

function printError(request, response, location) {
  document.querySelector('p').innerText = `There was an error accessing bike data for ${location}: ${request.status} ${request.statusText}: ${response.error}`;
}

function handleForm(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  document.querySelector('ol').innerText = null;
  document.querySelector('p').innerText = null;
  getBikes(location);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleForm);
});
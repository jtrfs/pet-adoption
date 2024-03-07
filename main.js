const temp = document.querySelector('.temp');
const url = 'https://api.weather.gov/gridpoints/MFL/110,50/forecast';

async function start() {
  const weatherDataPromise = await fetch(url);
  const weatherData = await weatherDataPromise.json();
  console.log('weather data from start():', weatherData);
  const tempNow = weatherData.properties.periods[0].temperature;
  temp.textContent = tempNow + '\u00B0F';
  console.log(tempNow);
}

start();

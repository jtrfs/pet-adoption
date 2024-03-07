const weatherUrl = 'https://api.weather.gov/gridpoints/MFL/110,50/forecast';
const petsUrl = 'https://learnwebcode.github.io/bootcamp-pet-data/pets.json';

const temp = document.querySelector('.temp');

// fetching the data from the weather api
async function start() {
  const weatherDataPromise = await fetch(weatherUrl);
  const weatherData = await weatherDataPromise.json();
  console.log('weather data from start():', weatherData);
  const tempNow = weatherData.properties.periods[0].temperature;
  temp.textContent = tempNow + '\u00B0F';
}

start();

// fetching the data for pets area
const petsArea = async function () {
  const petsPromise = await fetch(petsUrl);
  const petsData = await petsPromise.json();
  console.log('pets data from petsArea():', petsData);
  petsData.forEach(pet => {
    console.log(pet.name);
  });
};

petsArea();

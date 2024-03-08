const weatherUrl = 'https://api.weather.gov/gridpoints/MFL/110,50/forecast';
const petsUrl = 'https://learnwebcode.github.io/bootcamp-pet-data/pets.json';
const temp = document.querySelector('.temp');

const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();
const listOfPets = document.querySelector('.list-of-pets');

// fetching the data from the weather api
async function start() {
  const weatherDataPromise = await fetch(weatherUrl);
  const weatherData = await weatherDataPromise.json();
  // console.log('weather data from start():', weatherData);
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
    const clone = template.content.cloneNode(true);
    clone.querySelector('.pet-name').textContent = pet.name;
    clone.querySelector('.pet-description').textContent = pet.description;
    clone.querySelector('.pet-age').textContent = calculateAge(pet.birthYear);
    if (!pet.photo) pet.photo = 'images/fallback.jpg';
    clone.querySelector('.pet-card-photo img').src = pet.photo;
    clone.querySelector('.pet-card-photo img').alt = `This is a ${pet.species}`;
    console.log(pet.photo);

    wrapper.appendChild(clone);
  });
  listOfPets.appendChild(wrapper);
};

petsArea();

// calculate age for 3 scenarios: 1. less then a year, 2. one year, 3. more than a year
function calculateAge(birthYear) {
  const age = new Date().getFullYear() - birthYear;
  if (age < 1) return 'Less than a year old';
  else if (age === 1) return `${age} year old`;
  return `${age} years old`;
}

// pet filter button code
const petButtons = document.querySelectorAll('.pet-filter button');
petButtons.forEach(btn => {
  btn.addEventListener('click', handleButtonClick);
});

function handleButtonClick(e) {
  // remove active class from any and all buttons
  petButtons.forEach(btn => btn.classList.remove('active'));
  // add active class to the specific button that just got clicked
  e.target.classList.add('active');
  // actually filter the pets down below
}

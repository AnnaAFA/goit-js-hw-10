import './css/styles.css';
const debounce = require('lodash.debounce');
// console.log(debounce);
import Notiflix from 'notiflix';
// console.log(Notiflix);
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
// console.log(inputRef);
const listRef = document.querySelector('.country-list');
// console.log(listRef);
const infoRef = document.querySelector('.country-info');
// console.log(infoRef);
inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const value = e.target.value.trim();
  // console.log(value);

  deleteMarkup();

  if (value) {
    fetchCountries(value)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (countries.length >= 2) {
          renderMarkup(countries);
        }
        if (countries.length === 1) {
          renderInfo(countries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function deleteMarkup() {
  listRef.innerHTML = '';
  infoRef.innerHTML = '';
}

function renderMarkup(countries) {
  const countriesMarkup = countries
    .map(({ flags: { svg }, name: { official } }) => {
      return `<li><img src="${svg}" width=50><h2>${official}</h2></li>`;
    })
    .join('');
  listRef.innerHTML = countriesMarkup;
}

function renderInfo(countries) {
  const countryMarkup = countries
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => {
        return `<img src="${svg}" width=200><h2>${official}</h2><p>Capital:${
          capital[0]
        }</p><p>Population:${population}</p><p>Languages:${Object.values(
          languages
        )}</p>`;
      }
    )
    .join('');
  infoRef.innerHTML = countryMarkup;
}

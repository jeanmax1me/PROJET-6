// index.js

import { createUserCardDOM } from '../templates/photographer.js';

async function getPhotographers() {
  try {
    const response = await fetch('../../PROJET-6/data/photographers.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photographers data:', error);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const userCardDOM = createUserCardDOM(photographer);
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

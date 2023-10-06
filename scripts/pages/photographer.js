import { createImage, createCardContainer, createHeading, createParagraph } from "../templates/photographer.js";


const urlSearchParams = new URLSearchParams(window.location.search);
const photographerId = urlSearchParams.get('id');

if (photographerId) {
  getPhotographerById(photographerId)
    .then(data => {
      const name = data.name;
      const city = data.city;
      const country = data.country;
      const tagline = data.tagline;
      const price = data.price;
      const portrait = data.portrait;
      const picture = `assets/photographers/${portrait}`;
      const altname = data.altname;
      const img = createImage(picture, altname);
      const photographHeader = document.querySelector('.photograph-header');
      const imgcontainer = createCardContainer([img]);
      imgcontainer.appendChild(img);
      photographHeader.appendChild(imgcontainer);
      const h2 = createHeading('h2', name);
      const h3 = createHeading('h3', `${city}, ${country}`);
      const tag = createParagraph(tagline);
      photographHeader.append(h2, h3, tag);
    })
    .catch(error => {
      console.error('Error fetching photographer data:', error);
    });
} else {
  console.error('Photographer ID is missing or invalid.');
}

async function getPhotographerById(id) {
  try {
    const response = await fetch(`../../data/photographers.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch photographer data');
    }

    const data = await response.json();
    const photographer = data.photographers.find(photographer => photographer.id === parseInt(id, 10));

    if (!photographer) {
      throw new Error('Photographer not found');
    }

    return photographer;
  } catch (error) {
    console.error('Error fetching photographer data:', error);
    throw error;
  }
}

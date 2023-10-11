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
    const photographerPhotos = data.media.filter(photo => photo.photographerId === parseInt(photographerId));
    console.log(photographerPhotos);
    createPhotoGrid(photographerPhotos);
    if (!photographer) {
      throw new Error('Photographer not found');
    }

    return photographer;
  } catch (error) {
    console.error('Error fetching photographer data:', error);
    throw error;
  }
}

function createPhotoGrid(photos) {
  const photoGrid = document.querySelector('.photo-grid');
  photoGrid.innerHTML = ''; // Clear previous content

  photos.forEach(photo => {
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('photo');

    const image = document.createElement('img');
    image.src = `assets/images/${photographerId}/${photo.image}`; // Include photographerId in the path
    image.alt = photo.title;

    const photoInfo = document.createElement('div');
    photoInfo.classList.add('photo-info');

    const title = document.createElement('h3');
    title.textContent = photo.title;

    const likes = document.createElement('p');
    likes.textContent = `${photo.likes}`;
    likes.classList.add('photo-likes');


    const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heart.setAttribute("width", "21");
    heart.setAttribute("height", "24");
    heart.setAttribute("viewBox", "0 0 21 24");
    heart.setAttribute("fill", "none");
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("clip-path", "url(#clip0_120_561)");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z");
    path.setAttribute("fill", "#911C1C");
    g.appendChild(path);
    heart.appendChild(g);


    photoInfo.appendChild(heart);
    photoInfo.appendChild(title);
    photoInfo.appendChild(likes);
    photoDiv.appendChild(image);
    photoDiv.appendChild(photoInfo);
    photoGrid.appendChild(photoDiv);
  });
}

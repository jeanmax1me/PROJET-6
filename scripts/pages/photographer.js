import { createMedia } from './media.js';
import { createImage, createCardContainer, createHeading, createParagraph } from '../templates/photographer.js';

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

let photographerPhotos;

async function getPhotographerById(id) {
  try {
    const response = await fetch(`../../data/photographers.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch photographer data');
    }

    const data = await response.json();
    const photographer = data.photographers.find(photographer => photographer.id === parseInt(id, 10));
    photographerPhotos = data.media.filter(photo => photo.photographerId === parseInt(photographerId));
    createAndRenderMedia(photographerPhotos);
    sortPhotos('popularite');

    if (!photographer) {
      throw new Error('Photographer not found');
    }

    return photographer;
  } catch (error) {
    console.error('Error fetching photographer data:', error);
    throw error;
  }
}


function createVideoElement(src, alt) {
  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';
  video.alt = alt;
  video.controls = true; // Add video controls
  return video;
}

function createAndRenderMedia(photos) {
  if (!photos) {
    // Handle the case where there's no media data
    console.error('No media data available for this photographer.');
    return;
  }

  const photoGrid = document.querySelector('.photo-grid');
  photoGrid.innerHTML = ''; // Clear previous content

  photos.forEach(mediaData => {
    const media = createMedia(mediaData);
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('photo');

    if (media.type === 'image') {
      const image = document.createElement('img');
      image.src = media.url;
      image.alt = media.title;
      photoDiv.appendChild(image);
    } else if (media.type === 'video') {
      const video = createVideoElement(media.url, media.title);
      photoDiv.appendChild(video);
    }

    const photoInfo = document.createElement('div');
    photoInfo.classList.add('photo-info');

    const title = document.createElement('h3');
    title.textContent = media.title;

    const likescontainer = document.createElement('div');
    likescontainer.classList.add('likes-container');

    const likes = document.createElement('p');
    likes.textContent = `${media.likes}`;
    likes.classList.add('photo-likes');

    const heart = createHeartIcon();

    photoInfo.appendChild(title);
    photoInfo.appendChild(likescontainer);
    likescontainer.appendChild(likes);
    likescontainer.appendChild(heart);
    photoDiv.appendChild(photoInfo);
    photoGrid.appendChild(photoDiv);
  });
}


function createHeartIcon() {
  const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heart.setAttribute('width', '21');
  heart.setAttribute('height', '24');
  heart.setAttribute('viewBox', '0 0 21 24');
  heart.setAttribute('fill', 'none');
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('clip-path', 'url(#clip0_120_561)');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z');
  path.setAttribute('fill', '#911C1C');
  g.appendChild(path);
  heart.appendChild(g);

  return heart;
}


// Sorting functions
function sortByPopularity(photos) {
  return photos.sort((a, b) => b.likes - a.likes);
}

function sortByDate(photos) {
  return photos.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByTitle(photos) {
  return photos.sort((a, b) => a.title.localeCompare(b.title));
}

// Sort photos
async function sortPhotos(sortBy) {
  let sortedPhotos;

  switch (sortBy) {
    case 'popularite':
      sortedPhotos = sortByPopularity(photographerPhotos);
      break;
    case 'date':
      sortedPhotos = sortByDate(photographerPhotos);
      break;
    case 'titre':
      sortedPhotos = sortByTitle(photographerPhotos);
      break;
    default:
      break;
  }

  createAndRenderMedia(sortedPhotos);
}



document.getElementById('filter-date').addEventListener('click', () => sortPhotos('date'));
document.getElementById('filter-titre').addEventListener('click', () => sortPhotos('titre'));
document.getElementById('filter-popularite').addEventListener('click', () => sortPhotos('popularite'));
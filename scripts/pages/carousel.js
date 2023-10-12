// carousel.js
import { createMedia } from './media.js';
import { photographerPhotos } from './data.js'; // Import photographerPhotos from data.js

// Global DOM variables
const imageCarousel = document.getElementById('image-carousel');
const overlay = document.querySelector('.overlay');
const closeCarouselButton = document.querySelector('.carousel-close');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carouselContent = document.querySelector('.carousel-content');

let currentImageIndex = 0;

// Function to open the image carousel
function openImageCarousel() {
  imageCarousel.style.display = 'block';
  overlay.style.display = 'block';

  // Load the current image
  loadCurrentImage();
}

// Function to open the image carousel with media data
export function openCarousel(mediaData) {
  imageCarousel.style.display = 'block';
  overlay.style.display = 'block';
  currentImageIndex = photographerPhotos.findIndex(item => item.id === mediaData.id);
  loadCurrentImage();
}

// Function to close the image carousel
function closeImageCarousel() {
  imageCarousel.style.display = 'none';
  overlay.style.display = 'none';
}

// Function to load the current image into the carousel
function loadCurrentImage() {
  // Clear the existing content
  carouselContent.innerHTML = '';

  const media = createMedia(photographerPhotos[currentImageIndex]);
  const mediaElement = media.createMediaElement();
  mediaElement.classList.add('lightbox-media');
  carouselContent.appendChild(mediaElement);
}
// Rest of your code, including event listeners, stays the same


// Handle previous button click
prevButton.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        loadCurrentImage();
    }
});

// Handle next button click
nextButton.addEventListener('click', () => {
    if (currentImageIndex < photographerPhotos.length - 1) {
        currentImageIndex++;
        loadCurrentImage();
    }
});

// Handle close button click
closeCarouselButton.addEventListener('click', closeImageCarousel);
overlay.addEventListener('click', closeImageCarousel);

// Add click event listeners to open the image carousel
const mediaGridItems = document.querySelectorAll('.photo');
mediaGridItems.forEach((mediaItem, index) => {
    mediaItem.addEventListener('click', () => {
      currentImageIndex = index;
      openCarousel(photographerPhotos[index], photographerPhotos); // Pass the media data and the photos array
    });
  });
  
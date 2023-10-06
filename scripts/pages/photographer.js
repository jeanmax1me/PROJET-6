//Mettre le code JavaScript lié à la page photographer.html


const urlSearchParams = new URLSearchParams(window.location.search);
const photographerId = urlSearchParams.get('id');
if (photographerId) {
  console.log('Photographer ID:', photographerId);
} else {
  console.error('Photographer ID is missing or invalid.');
}

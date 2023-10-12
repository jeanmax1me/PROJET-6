// Global DOM variables
const modal = document.getElementById('contact_modal');
const openModalBtn = document.querySelector('.contact_button');
const closeModalBtn = document.querySelector('.modal-close-btn');
const dialog = document.querySelector('.modal-dialog');
const content = document.querySelector('.modal-content');
const overlay = document.querySelector('.overlay');


// Function to open the modal
function displayModal() {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  openModalBtn.setAttribute('aria-expanded', 'true');
  closeModalBtn.focus();
  document.body.style.overflow = 'hidden';
  overlay.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  openModalBtn.setAttribute('aria-expanded', 'false');
  openModalBtn.focus();
  document.body.style.overflow = 'auto';
  overlay.style.display = 'none';
}

// Event listeners
openModalBtn.addEventListener('click', displayModal);
closeModalBtn.addEventListener('click', closeModal);

// Close modal when the Escape key is pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});


const form = document.getElementById('contact-form');


form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    closeModal();
  });
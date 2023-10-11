

const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.selected');
const options = dropdown.querySelector('.dropdown-menu');
const dropdownIcon = dropdown.querySelector('.dropdown-icon');

selected.addEventListener('click', () => {
    toggleDropdown();
});

selected.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        toggleDropdown();
    }
});

options.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-option')) {
        const selectedText = selected.textContent;
        selected.textContent = e.target.textContent;
        e.target.textContent = selectedText;
        selected.setAttribute('aria-label', `Selected option: ${e.target.textContent}`);
        selected.setAttribute('aria-expanded', 'false');
        options.style.display = 'none';
        
        // Reset the icon rotation
        dropdownIcon.style.transform = 'rotate(0)';
    }
});

// Function to toggle the dropdown
function toggleDropdown() {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
    selected.setAttribute('aria-expanded', options.style.display === 'block' ? 'true' : 'false');
    
    // Rotate the icon
    dropdownIcon.style.transform = options.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0)';
}


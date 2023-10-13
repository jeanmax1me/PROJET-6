

const dropdown = document.querySelector('.dropdown');
const selected = dropdown.querySelector('.selected');
const options = dropdown.querySelector('.dropdown-menu');
const dropdownIcon = dropdown.querySelector('.dropdown-icon');

selected.addEventListener('click', () => {
    toggleDropdown();
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

selected.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      toggleDropdown();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      options.style.display = 'block';
      options.querySelector('.dropdown-option').focus();
    }
  });
  
  options.addEventListener('keydown', (e) => {
    const optionElements = options.querySelectorAll('.dropdown-option');
    const currentOptionIndex = Array.from(optionElements).indexOf(e.target);
  
    if (e.key === 'Enter') {
      const selectedText = selected.textContent;
      selected.textContent = e.target.textContent;
      e.target.textContent = selectedText;
      selected.setAttribute('aria-label', `Selected option: ${e.target.textContent}`);
      selected.setAttribute('aria-expanded', 'false');
      options.style.display = 'none';
  
      // Reset the icon rotation
      dropdownIcon.style.transform = 'rotate(0)';
      selected.focus();
    } else if (e.key === 'Escape') {
      options.style.display = 'none';
      selected.setAttribute('aria-expanded', 'false');
      dropdownIcon.style.transform = 'rotate(0)';
      selected.focus();
    } else if (e.key === 'ArrowUp' && currentOptionIndex > 0) {
      e.preventDefault();
      optionElements[currentOptionIndex - 1].focus();
    } else if (e.key === 'ArrowDown' && currentOptionIndex < optionElements.length - 1) {
      e.preventDefault();
      optionElements[currentOptionIndex + 1].focus();
    }
  });
  

  
  
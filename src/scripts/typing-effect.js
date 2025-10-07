
function setupTypingEffect(elementId, words, wait = 3000) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    let displayText = '';

    if (isDeleting) {
      displayText = currentWord.substring(0, charIndex - 1);
    } else {
      displayText = currentWord.substring(0, charIndex + 1);
    }

    element.textContent = displayText;

    let typeSpeed = 150; // Typing speed

    if (isDeleting) {
      typeSpeed /= 2; // Deleting faster
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Word is typed, pause before deleting
      typeSpeed = wait;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word is deleted, move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing effect
  type();
}

// Export the function to be used in Astro components
export default setupTypingEffect;

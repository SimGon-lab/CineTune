// -----------------------------
// SPARKLE EFFECT
// -----------------------------
document.addEventListener("mousemove", function(e) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 600);
});

// -----------------------------
// RSVP FORM HANDLING
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('rsvp-form');
  const participantsList = document.getElementById('participants');
  const countDisplay = document.getElementById('rsvp-count');
  let rsvpCount = 0;

  // Modal references
  const modal = document.getElementById("rsvp-modal");
  const overlay = document.getElementById("rsvp-overlay");
  const modalText = document.getElementById("rsvp-modal-text");
  const modalImg = document.getElementById("rsvp-modal-img");

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const movie = document.getElementById('movie');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    let valid = true;

    // Validate required fields
    [name, movie].forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('invalid');
        valid = false;
      } else {
        input.classList.remove('invalid');
      }
    });

    // Validate email
    if (!emailPattern.test(email.value)) {
      email.classList.add('invalid');
      valid = false;
    } else {
      email.classList.remove('invalid');
    }

    if (valid) {
      // Add RSVP to list
      const li = document.createElement('li');
      li.textContent = `${name.value} - ${movie.value}`;
      participantsList.appendChild(li);
      rsvpCount++;
      countDisplay.textContent = rsvpCount;

      // Personalized modal message
      modalText.textContent = `${name.value}, your connection for "${movie.value}" has been recorded!! woo hoo!`;

      // Show overlay and modal
      overlay.style.display = 'block';
      modal.style.display = 'flex';

      // Trigger CSS transition
      requestAnimationFrame(() => {
        overlay.style.opacity = 1;
        modal.classList.add('show');
      });

      // Animate image
      let angle = 0;
      let scale = 1;
      const interval = setInterval(() => {
        angle += 10;
        scale = Math.min(scale + 0.02, 1.5); // cap scale at 1.5
        modalImg.style.transform = `rotate(${angle}deg) scale(${scale})`;
      }, 50);

      // Hide modal after 4 seconds
      setTimeout(() => {
        modal.classList.remove('show');
        overlay.style.opacity = 0;
        clearInterval(interval); // stop animation

        // Hide completely after transition
        setTimeout(() => {
          modal.style.display = 'none';
          overlay.style.display = 'none';
          modalImg.style.transform = 'rotate(0deg) scale(1)'; // reset
        }, 400);
      }, 4000);

      form.reset();
    }
  });
});

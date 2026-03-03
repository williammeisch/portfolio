// --- 1. SILVER/WHITE CONFETTI EFFECT ---
const duration = 60 * 60 * 1000;
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 5, spread: 360, ticks: 150, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 1;

  // Floating Silver/White Particles
  confetti({
    ...defaults,
    particleCount,
    origin: { x: randomInRange(0, 1), y: Math.random() - 0.2 },
    colors: ['#C0C0C0', '#FFFFFF', '#E5E4E2'],
    gravity: randomInRange(0.2, 0.5),
    scalar: randomInRange(0.4, 0.8),
    drift: randomInRange(-0.4, 0.4)
  });
}, 300);

// --- 2. PROJECT FILTERING LOGIC ---
function filterProjects(category, event) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.tab-btn');

    // Update active button state
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event) {
        event.target.classList.add('active');
    }

    // Filter cards with a simple fade
    cards.forEach(card => {
        card.style.transition = "opacity 0.3s ease";
        if (card.classList.contains(category)) {
            card.style.display = "block";
            setTimeout(() => { card.style.opacity = "1"; }, 10);
        } else {
            card.style.opacity = "0";
            setTimeout(() => { card.style.display = "none"; }, 300);
        }
    });
}

// Ensure Option 1 is visible on start
window.onload = () => {
    filterProjects('opt1');
};

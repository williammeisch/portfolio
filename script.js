const heroSection = document.querySelector('.hero');

// --- SILVER CONFETTI LOGIC ---
function fireConfetti() {
  const rect = heroSection.getBoundingClientRect();
  // Only fires when header is on screen
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    confetti({
      particleCount: 4, 
      angle: 90,
      spread: 70,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#ffffff', '#c0c0c0', '#808080', '#ff0000'],
      gravity: 0.6,
      scalar: 0.7,
      ticks: 200
    });
  }
}

setInterval(fireConfetti, 150); 

// --- TAB FILTERING LOGIC ---
function filterProjects(category, event) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = "block";
            setTimeout(() => { card.style.opacity = "1"; }, 10);
        } else {
            card.style.opacity = "0";
            setTimeout(() => { card.style.display = "none"; }, 300);
        }
    });
}

window.onload = () => filterProjects('opt1');

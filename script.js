// --- 1. FLOATING EMBERS EFFECT (Silver & Red) ---
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": ["#ffffff", "#c0c0c0", "#ff0000"] },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
    "size": { "value": 3, "random": true, "anim": { "enable": false } },
    "line_linked": { "enable": false },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "top",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true }
  },
  "retina_detect": true
});

// --- 2. PROJECT FILTERING ---
function filterProjects(category, event) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.tab-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    cards.forEach(card => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        if (card.classList.contains(category)) {
            card.style.display = "block";
            setTimeout(() => { 
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            }, 10);
        } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => { card.style.display = "none"; }, 400);
        }
    });
}

// Initial state
window.onload = () => filterProjects('opt1');

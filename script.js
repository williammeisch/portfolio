const navLinks = document.querySelectorAll('.site-nav a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0.05 }
);

document.querySelectorAll('main section').forEach((section) => sectionObserver.observe(section));

const tiltShape = document.getElementById('tilt-shape');

if (tiltShape) {
  const maxTilt = 16;
  const maxFlip = 20;

  const updateTilt = (event) => {
    const bounds = tiltShape.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    const rotateY = (x - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - y) * (maxTilt * 2);
    const flipY = (x - 0.5) * (maxFlip * 2);

    tiltShape.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    tiltShape.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    tiltShape.style.setProperty('--flip-y', `${flipY.toFixed(2)}deg`);
  };

  tiltShape.addEventListener('pointermove', updateTilt);
  tiltShape.addEventListener('pointerleave', () => {
    tiltShape.style.setProperty('--tilt-x', '-10deg');
    tiltShape.style.setProperty('--tilt-y', '14deg');
    tiltShape.style.setProperty('--flip-y', '0deg');
  });

  tiltShape.addEventListener('click', () => {
    const isFlipped = tiltShape.dataset.flipped === 'true';
    const nextFlipped = !isFlipped;
    tiltShape.dataset.flipped = String(nextFlipped);
    tiltShape.style.setProperty('--click-flip', nextFlipped ? '180deg' : '0deg');
    tiltShape.closest('.hero-shape')?.classList.toggle('hero-shape-red-bg', nextFlipped);
  });
}


const roleMoreToggle = document.querySelector('.role-more-toggle');
const roleMorePanel = document.getElementById('current-role-more');

if (roleMoreToggle && roleMorePanel) {
  roleMoreToggle.addEventListener('click', () => {
    const isOpen = roleMoreToggle.getAttribute('aria-expanded') === 'true';
    roleMoreToggle.setAttribute('aria-expanded', String(!isOpen));
    roleMorePanel.hidden = isOpen;
    roleMoreToggle.textContent = isOpen ? 'More details ▾' : 'Hide details ▴';
  });
}

const backToTopBtn = document.getElementById('back-to-top-btn');

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

const rideAgainBtn = document.getElementById('ride-again-btn');
const rideTrackOverlay = document.getElementById('ride-track-overlay');
const coasterPath = document.getElementById('coaster-center-path');
const coasterCart = document.getElementById('ride-track-cart');

if (rideAgainBtn && rideTrackOverlay && coasterPath && coasterCart) {
  const totalLength = coasterPath.getTotalLength();
  const durationMs = 1900;

  const setCartAtProgress = (progress) => {
    const clamped = Math.min(1, Math.max(0, progress));
    const distance = totalLength * clamped;
    const point = coasterPath.getPointAtLength(distance);
    const lookAhead = coasterPath.getPointAtLength(Math.min(totalLength, distance + 2));
    const angle = Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * (180 / Math.PI);

    const x = (point.x / 1200) * window.innerWidth;
    const y = (point.y / 1000) * window.innerHeight;

    coasterCart.style.transform = `translate(${x - 17}px, ${y - 10}px) rotate(${angle}deg)`;
    coasterCart.style.opacity = '1';
  };

  const runRide = () => {
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setCartAtProgress(eased);

      if (t < 1) {
        window.requestAnimationFrame(step);
      } else {
        coasterCart.style.opacity = '0';
        rideTrackOverlay.classList.remove('is-active');
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        rideAgainBtn.disabled = false;
      }
    };

    window.requestAnimationFrame(step);
  };

  rideAgainBtn.addEventListener('click', () => {
    if (rideAgainBtn.disabled) return;
    rideAgainBtn.disabled = true;

    rideTrackOverlay.classList.add('is-active');
    setCartAtProgress(0);
    runRide();
  });
}

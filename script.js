// Canvas Setup for Animated Embers
const canvas = document.getElementById('emberCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ember particle system
const embers = [];
const emberCount = 50;

class Ember {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fadeRate = Math.random() * 0.01 + 0.005;
        this.color = this.getRandomEmberColor();
    }

    getRandomEmberColor() {
        const colors = [
            'rgba(255, 23, 68, ',
            'rgba(196, 28, 59, ',
            'rgba(255, 87, 34, ',
            'rgba(224, 224, 224, ',
            'rgba(176, 176, 176, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeRate;

        if (this.opacity <= 0 || this.y < 0 || this.x < 0 || this.x > canvas.width) {
            return false;
        }
        return true;
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = this.color + (this.opacity * 0.5) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function initEmbers() {
    for (let i = 0; i < emberCount; i++) {
        embers.push(new Ember());
    }
}

function animateEmbers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw embers
    for (let i = embers.length - 1; i >= 0; i--) {
        if (!embers[i].update()) {
            embers.splice(i, 1);
        } else {
            embers[i].draw();
        }
    }

    // Spawn new embers
    if (embers.length < emberCount) {
        embers.push(new Ember());
    }

    requestAnimationFrame(animateEmbers);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    initEmbers();
    animateEmbers();
});

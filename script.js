function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.tab-btn');

    // Update active button state
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Show/Hide cards
    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = "block";
            // Add a small fade-in effect
            card.style.opacity = "0";
            setTimeout(() => card.style.opacity = "1", 10);
        } else {
            card.style.display = "none";
        }
    });
}

// Initialize to show only Option 1 on load
document.addEventListener('DOMContentLoaded', () => {
    filterProjects('opt1'); 
});


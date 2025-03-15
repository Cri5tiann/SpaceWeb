document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = Math.random() * window.innerHeight + "px";
        star.style.animationDuration = (1 + Math.random() * 2) + "s"; // Randomize fall speed
        body.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 2000); // Remove star after animation
    }

    // Create more stars
    setInterval(createStar, 200); // Create a star every 200ms(2 seconds)
});
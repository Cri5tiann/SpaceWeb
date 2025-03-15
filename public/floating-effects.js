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

    // Create the floating astronaut
    function createAstronaut() {
        const astronaut = document.createElement("div");
        astronaut.classList.add("astronaut");
        astronaut.style.left = Math.random() * window.innerWidth + "px";
        astronaut.style.top = Math.random() * window.innerHeight + "px";
        body.appendChild(astronaut);

        // Function to move the astronaut naturally
        function moveAstronaut() {
            const speed = 0.3; // Speed of movement (pixels per frame)
            const rotationSpeed = 0.2; // Speed of rotation (degrees per frame)

            // Random target position
            let targetX = Math.random() * window.innerWidth;
            let targetY = Math.random() * window.innerHeight;

            // Function to update astronaut position
            function updatePosition() {
                const currentX = parseFloat(astronaut.style.left);
                const currentY = parseFloat(astronaut.style.top);

                // Move towards the target position
                const dx = targetX - currentX;
                const dy = targetY - currentY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 1) {
                    astronaut.style.left = currentX + (dx / distance) * speed + "px";
                    astronaut.style.top = currentY + (dy / distance) * speed + "px";
                } else {
                    // Set a new random target position
                    targetX = Math.random() * window.innerWidth;
                    targetY = Math.random() * window.innerHeight;
                }

                // Rotate the astronaut slightly
                const rotation = parseFloat(astronaut.style.transform.replace("rotate(", "").replace("deg)", "")) || 0;
                astronaut.style.transform = `rotate(${rotation + rotationSpeed}deg)`;

                // Continue the animation
                requestAnimationFrame(updatePosition);
            }

            // Start the animation
            updatePosition();
        }

        // Start moving the astronaut
        moveAstronaut();
    }

    // Create more stars
    setInterval(createStar, 100); // Create a star every 100ms

    // Create the astronaut
    createAstronaut();
});
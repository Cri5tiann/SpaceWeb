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
        }, 2000); // Șterge steaua după 2 secunde
    }

    // Crearea unui astronaut care se mișcă în jurul ecranului 
    function createAstronaut() {
        const astronaut = document.createElement("div");
        astronaut.classList.add("astronaut");
        astronaut.style.left = Math.random() * window.innerWidth + "px";
        astronaut.style.top = Math.random() * window.innerHeight + "px";
        body.appendChild(astronaut);

        // Funcție pentru a muta astronautul în jurul ecranului
        function moveAstronaut() {
            const speed = 0.3; // Speed of movement (pixels per frame)
            const rotationSpeed = 0.2; // Speed of rotation (degrees per frame)

            // Poziția țintă randomizată
            let targetX = Math.random() * window.innerWidth;
            let targetY = Math.random() * window.innerHeight;

            // Funcție pentru a actualiza poziția astronautului
            function updatePosition() {
                const currentX = parseFloat(astronaut.style.left);
                const currentY = parseFloat(astronaut.style.top);

                // Mișcarea astronautului către poziția țintă
                const dx = targetX - currentX;
                const dy = targetY - currentY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 1) {
                    astronaut.style.left = currentX + (dx / distance) * speed + "px";
                    astronaut.style.top = currentY + (dy / distance) * speed + "px";
                } else {
                    // setează o nouă poziție țintă randomizată
                    targetX = Math.random() * window.innerWidth;
                    targetY = Math.random() * window.innerHeight;
                }

                // Rotește  
                const rotation = parseFloat(astronaut.style.transform.replace("rotate(", "").replace("deg)", "")) || 0;
                astronaut.style.transform = `rotate(${rotation + rotationSpeed}deg)`;

                // Continuă animația
                requestAnimationFrame(updatePosition);
            }

            // Începe animația
            updatePosition();
        }

        // Începe mișcarea astronautului
        moveAstronaut();
    }

    // Creează stele la intervale regulate
    setInterval(createStar, 100); // Create a star every 100ms

    // Crează astronautul la început
    createAstronaut();
});
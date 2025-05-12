document.addEventListener("DOMContentLoaded", async () => {
    const table = document.getElementById("astroTable").getElementsByTagName('tbody')[0];
    const modal = document.getElementById("shipModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close");

    async function fetchWikipediaSummary(query) {
        try {
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
            const data = await response.json();
            return {
                summary: data.extract,
                image: data.thumbnail ? data.thumbnail.source : null
            };
        } catch (error) {
            console.error("Error fetching Wikipedia data:", error);
            return { summary: "No information available.", image: null };
        }
    }

    // Închide modalul când se apasă pe butonul de închidere
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Închide modalul când se apasă pe orice parte a ferestrei
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    try {
        const response = await fetch("/data");
        const data = await response.json();

        data.people.forEach(person => {
            const row = table.insertRow();
            const nameCell = row.insertCell(0);
            const craftCell = row.insertCell(1);

            nameCell.innerText = person.name;
            craftCell.innerText = person.craft;

            // Fă numele astronautului clicabil
            nameCell.style.cursor = "pointer";
            nameCell.addEventListener("click", async () => {
                const info = await fetchWikipediaSummary(person.name);
                modalTitle.innerText = person.name;
                modalDescription.innerText = info.summary;
                modalImage.src = info.image || ""; // Setează imaginea dacă este disponibilă
                modal.style.display = "block"; // Arată modalul
            });

            // Fă numele navei clicabil
            craftCell.style.cursor = "pointer";
            craftCell.addEventListener("click", async () => {
                const info = await fetchWikipediaSummary(person.craft);
                modalTitle.innerText = person.craft;
                modalDescription.innerText = info.summary;
                modalImage.src = info.image || ""; // Setează imaginea dacă este disponibilă
                modal.style.display = "block"; // Arată modalul
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
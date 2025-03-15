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

    // Close modal when clicking the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal
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

            // Make astronaut name clickable
            nameCell.style.cursor = "pointer";
            nameCell.addEventListener("click", async () => {
                const info = await fetchWikipediaSummary(person.name);
                modalTitle.innerText = person.name;
                modalDescription.innerText = info.summary;
                modalImage.src = info.image || ""; // Set image if available
                modal.style.display = "block"; // Show the modal
            });

            // Make ship name clickable
            craftCell.style.cursor = "pointer";
            craftCell.addEventListener("click", async () => {
                const info = await fetchWikipediaSummary(person.craft);
                modalTitle.innerText = person.craft;
                modalDescription.innerText = info.summary;
                modalImage.src = info.image || ""; // Set image if available
                modal.style.display = "block"; // Show the modal
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
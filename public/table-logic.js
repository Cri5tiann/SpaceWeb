document.addEventListener("DOMContentLoaded", async () => {
    const table = document.getElementById("astroTable");
    const tbody = table.getElementsByTagName('tbody')[0];
    const modal = document.getElementById("shipModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close");
    
    // Funcția pentru a prelua informații de pe Wikipedia
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
        // Recreăm tabelul cu stil personalizat pentru a evita problemele de borduri
        const originalTable = table.cloneNode(false);
        const originalThead = table.getElementsByTagName('thead')[0].cloneNode(true);
        originalTable.appendChild(originalThead);
        
        // Creăm un nou tbody
        const newTbody = document.createElement('tbody');
        originalTable.appendChild(newTbody);
        
        // Înlocuim tabelul vechi cu cel nou
        table.parentNode.replaceChild(originalTable, table);
        
        // Actualizăm referințele
        const newTable = originalTable;
        const tbody = newTbody;
        
        const response = await fetch("/data");
        const data = await response.json();
        
        // Grupăm astronauții după navă
        const groupedByCraft = {};
        
        data.people.forEach(person => {
            if (!groupedByCraft[person.craft]) {
                groupedByCraft[person.craft] = [];
            }
            groupedByCraft[person.craft].push(person.name);
        });
        
        let isFirstCraft = true;
        
        // Parcurgem fiecare navă
        for (const craft in groupedByCraft) {
            const astronauts = groupedByCraft[craft];
            const middleIndex = Math.floor(astronauts.length / 2);
            
            // Creăm un div container pentru grupul de astronauți ai unei nave
            const craftGroup = document.createElement('tr');
            craftGroup.className = 'craft-group';
            craftGroup.style.borderTop = isFirstCraft ? '1px solid white' : '2px solid white';
            isFirstCraft = false;
            
            // Creăm o celulă container pentru întregul grup
            const groupCell = document.createElement('td');
            groupCell.colSpan = 2;
            groupCell.style.padding = '0';
            groupCell.style.border = 'none';
            
            // Creăm un tabel intern pentru grupul de astronauți
            const innerTable = document.createElement('table');
            innerTable.style.width = '100%';
            innerTable.style.borderCollapse = 'collapse';
            innerTable.style.border = 'none';
            
            // Adăugăm astronauții în tabelul intern
            for (let i = 0; i < astronauts.length; i++) {
                const astronautRow = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.innerText = astronauts[i];
                nameCell.style.width = '50%';
                nameCell.style.padding = '10px';
                nameCell.style.border = 'none';
                nameCell.style.cursor = 'pointer';
                
                // Adăugăm evenimentul click pentru astronaut
                nameCell.addEventListener("click", async () => {
                    const info = await fetchWikipediaSummary(astronauts[i]);
                    modalTitle.innerText = astronauts[i];
                    modalDescription.innerText = info.summary;
                    modalImage.src = info.image || "";
                    modal.style.display = "block";
                });
                
                const craftCell = document.createElement('td');
                craftCell.style.width = '50%';
                craftCell.style.padding = '10px';
                craftCell.style.border = 'none';
                
                // Afișăm numele navei doar în mijlocul listei
                if (i === middleIndex) {
                    craftCell.innerText = craft;
                    craftCell.style.cursor = 'pointer';
                    
                    // Adăugăm evenimentul click pentru navă
                    craftCell.addEventListener("click", async () => {
                        const info = await fetchWikipediaSummary(craft);
                        modalTitle.innerText = craft;
                        modalDescription.innerText = info.summary;
                        modalImage.src = info.image || "";
                        modal.style.display = "block";
                    });
                }
                
                astronautRow.appendChild(nameCell);
                astronautRow.appendChild(craftCell);
                innerTable.appendChild(astronautRow);
            }
            
            // Adăugăm tabelul intern în celula container
            groupCell.appendChild(innerTable);
            craftGroup.appendChild(groupCell);
            
            // Adăugăm grupul în tbody
            tbody.appendChild(craftGroup);
            
            // Adăugăm un rând separator la final, cu excepția ultimului grup
            if (Object.keys(groupedByCraft).indexOf(craft) < Object.keys(groupedByCraft).length - 1) {
                const separatorRow = document.createElement('tr');
                separatorRow.style.height = '2px';
                separatorRow.style.backgroundColor = 'black';
                
                const separatorCell = document.createElement('td');
                separatorCell.colSpan = 2;
                separatorCell.style.padding = '0';
                separatorCell.style.borderTop = '1px solid white';
                separatorCell.style.borderBottom = '1px solid white';
                
                separatorRow.appendChild(separatorCell);
                tbody.appendChild(separatorRow);
            }
        }
        
        // Adăugăm bordură la final
        const lastRow = tbody.lastChild;
        lastRow.style.borderBottom = '1px solid white';
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
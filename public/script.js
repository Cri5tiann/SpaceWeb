document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch('/data');
    const data = await response.json();
    
    const table = document.getElementById("astroTable");

    data.people.forEach(astronaut => {
        let row = table.insertRow();
        row.insertCell(0).textContent = astronaut.name;
        row.insertCell(1).textContent = astronaut.craft;
    });
});

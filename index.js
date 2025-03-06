const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000; // Portul pe care rulează serverul

// Funcție pentru a obține datele de la API
async function getAstronauts() {
    try {
        const response = await axios.get('http://api.open-notify.org/astros.json');
        return response.data;
    } catch (error) {
        console.error('Eroare la obținerea datelor de la API:', error);
        process.exit(1);
    }
}

// Funcție pentru a procesa datele
function processData(data) {
    const astronauts = data.people;
    const grouped = {};

    astronauts.forEach(astronaut => {
        if (!grouped[astronaut.craft]) {
            grouped[astronaut.craft] = [];
        }
        grouped[astronaut.craft].push(astronaut.name);
    });

    return grouped;
}

// Funcție pentru a genera un tabel HTML
function generateHTMLTable(groupedData) {
    let html = `<h1>Există ${Object.values(groupedData).flat().length} persoane în spațiu în acest moment:</h1>`;
    html += `<table border="1" cellpadding="10" cellspacing="0">`;
    html += `<tr><th>Name</th><th>Craft</th></tr>`;

    for (const [craft, names] of Object.entries(groupedData)) {
        names.forEach(name => {
            html += `<tr><td>${name}</td><td>${craft}</td></tr>`;
        });
    }

    html += `</table>`;
    return html;
}

// Endpoint pentru a afișa datele în browser
app.get('/', async (req, res) => {
    try {
        const data = await getAstronauts();
        const groupedData = processData(data);
        const htmlTable = generateHTMLTable(groupedData);
        res.send(htmlTable);
    } catch (error) {
        res.status(500).send('Eroare la preluarea datelor de la API.');
    }
});

// Pornește serverul
app.listen(port, () => {
    console.log(`Serverul rulează la http://localhost:${port}`);
});
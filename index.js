const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 

// Setează folderul public pentru fișiere statice
app.use(express.static(path.join(__dirname, 'public')));

// Funcție pentru a obține datele de la API
async function getAstronauts() {
    try {
        const response = await axios.get('http://api.open-notify.org/astros.json');
        return response.data;
    } catch (error) {
        console.error('Eroare la obținerea datelor de la API:', error);
        return { people: [] };
    }
}

// Endpoint pentru a trimite datele către frontend
app.get('/data', async (req, res) => {
    const data = await getAstronauts();
    res.json(data);
});

// Servirea paginii HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Pornește serverul
app.listen(port, () => {
    console.log(`Serverul rulează la http://localhost:${port}`);
});

///////////////////////////////////////////////////MAPA///////////////////////////////////////////////////////////////
// inicializácia mapy
const map = L.map('map').setView([48.1486, 17.1077], 7);

// podkladová mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// konkrétne miesta
const miesta = [
    { lat: 48.1486,lng: 17.1077,nazov: "Bratislava - Stare Mesto"},
    { lat: 48.3064,lng: 18.0840,nazov: "Nitra"},
    { lat: 48.3774, lng: 17.5872, nazov: "Trnava" },
    { lat: 49.2238,lng: 18.7394,nazov: "Žilina"},
    { lat: 48.3064, lng: 18.0840, nazov: "Nitra" },
    { lat: 48.9371, lng: 21.9163, nazov: "Humenné" },
    { lat: 48.7164, lng: 21.2611, nazov: "Košice" },
    { lat: 48.9984, lng: 21.2396, nazov: "Prešov" },
    { lat: 48.7395, lng: 19.1530, nazov: "Banská Bystrica" }
];

// pridanie markerov
miesta.forEach(m => {
    L.marker([m.lat, m.lng])
        .addTo(map)
        .bindPopup(`<strong>${m.nazov}</strong>`);
});

//////////////////////////////////////////////KATALOG POP UP/////////////////////////////////////////////////////////

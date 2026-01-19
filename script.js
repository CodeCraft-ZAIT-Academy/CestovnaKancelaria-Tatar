///////////////////////////////////////////////////MAPA///////////////////////////////////////////////////////////////
// inicializácia mapy
if (document.getElementById("map")) {
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
}
//////////////////////////////////////////////KATALOG POP UP/////////////////////////////////////////////////////////

document.addEventListener("click", e => {
    
  // OTVORENIE POPUPU
  const openBtn = e.target.closest(".zajazd-open-btn");

  if (openBtn) {
    const id = openBtn.dataset.id;

    fetch("zajazdy.json")
      .then(res => res.json())
      .then(data => {
        const z = data[id];
        if (!z) return;

        document.getElementById("zajazd-nazov").textContent = z.nazov;
        document.getElementById("zajazd-destinacia").textContent = z.destinacia;
        document.getElementById("zajazd-datum").textContent = z.datum;
        document.getElementById("zajazd-dlzka").textContent = z.dlzka;
        document.getElementById("zajazd-cena").textContent = z.cena;
        document.getElementById("zajazd-sprievodca").textContent = z.sprievodca;
        document.getElementById("zajazd-popis").textContent = z.popis;
        document.getElementById("zajazd-obrazok").src = z.obrazok;
        document.getElementById("zajazd-obrazok").alt = z.nazov;

        document.getElementById("zajazd-modal").classList.add("is-active");
      })
      .catch(err => console.error("Chyba JSON:", err));
  }


  // ZATVORENIE POPUPU (X)

  if (e.target.classList.contains("zajazd-modal-close")) {
    document.getElementById("zajazd-modal").classList.remove("is-active");
  }

  // ZATVORENIE POPUPU (klik mimo)

  if (e.target.id === "zajazd-modal") {
    document.getElementById("zajazd-modal").classList.remove("is-active");
  }
});

// ZATVORENIE POPUPU (ESC)

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.getElementById("zajazd-modal").classList.remove("is-active");
  }
});


///////////////////////////////////////////////GENEROVANIE KATALOGU/////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const katalogGrid = document.getElementById("katalog-grid");
  if (!katalogGrid) return;

  fetch("zajazdy.json")
    .then(res => res.json())
    .then(data => {
      Object.entries(data).forEach(([id, z]) => {
        const post = document.createElement("div");
        post.className = "Grid-Katalog-Post";

        post.innerHTML = `
          <img
            src="${z.obrazok}"
            class="Grid-Katalog-Post-Image"
            alt="${z.nazov}"
          >

          <h2 class="Homepage-Post-Title">${z.nazov}</h2>

          <div class="Grid-Katalog-Post-Parameters">
            <p class="Grid-Katalog-Post-Text">Destinácia: ${z.destinacia}</p>
            <p class="Grid-Katalog-Post-Text">Cena: ${z.cena}</p>
            <p class="Grid-Katalog-Post-Text">Dĺžka pobytu: ${z.dlzka}</p>

            <button
              class="Grid-Katalog-Post-Button zajazd-open-btn"
              data-id="${id}"
            >
              Viac informácií
            </button>
          </div>
        `;

        katalogGrid.appendChild(post);
      });
    })
    .catch(err => console.error("Chyba pri načítaní katalógu:", err));
});

/////////////////////////////////////////////////GENEROVANIE KATALOGU HOMEPAGE///////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const katalogGrid = document.getElementById("katalog-grid-home");
  if (!katalogGrid) return;

  fetch("zajazdy.json")
    .then(res => res.json())
    .then(data => {
      // 1. Convert the object entries to an array
      const entries = Object.entries(data);

      // 2. Shuffle the array randomly
      const shuffled = entries.sort(() => 0.5 - Math.random());

      // 3. Take only the first 4 items
      const selected = shuffled.slice(0, 4);

      selected.forEach(([id, z]) => {
        const post = document.createElement("div");
        post.className = "Grid-Katalog-Post";

        post.innerHTML = `
          <img
            src="${z.obrazok}"
            class="Grid-Katalog-Post-Image"
            alt="${z.nazov}"
          >

          <h2 class="Homepage-Post-Title">${z.nazov}</h2>

          <div class="Grid-Katalog-Post-Parameters">
            <p class="Grid-Katalog-Post-Text">Destinácia: ${z.destinacia}</p>
            <p class="Grid-Katalog-Post-Text">Cena: ${z.cena}</p>
            <p class="Grid-Katalog-Post-Text">Dĺžka pobytu: ${z.dlzka}</p>

            <button
              class="Grid-Katalog-Post-Button zajazd-open-btn"
              data-id="${id}"
            >
              Viac informácií
            </button>
          </div>
        `;

        katalogGrid.appendChild(post);
      });
    })
    .catch(err => console.error("Chyba pri načítaní katalógu:", err));
});
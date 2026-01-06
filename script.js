function initMap() {

    const stred = { lat: 48.1486, lng: 17.1077 }; // Bratislava

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: stred
    });

    const miesta = [
        { lat: 48.1486, lng: 17.1077, nazov: "Bratislava" },
        { lat: 48.3064, lng: 18.0840, nazov: "Nitra" },
        { lat: 49.2238, lng: 18.7394, nazov: "Žilina" }
    ];

    miesta.forEach(m => {
        new google.maps.Marker({
            position: { lat: m.lat, lng: m.lng },
            map: map,
            title: m.nazov
        });
    });
}
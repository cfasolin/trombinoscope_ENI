var map = L.map('map')
map.setView([46.5, 2.5], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("promo.json")
    .then(response => response.json())
    .then(users => {
        users.apprenants.forEach(element => {
            if (element.coordonnees.latitude !== "") {
               const marker = L.marker([element.coordonnees.latitude, element.coordonnees.longitude]).addTo(map)
                marker.bindPopup(`<div><p>${element.prenom} ${element.nom}<p>
                    <img src="ressources/avatar/${element.avatar}" alt="${element.prenom}" width="120"></div>`)
            }
        })
    })
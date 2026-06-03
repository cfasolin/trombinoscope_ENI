const documentHTML = document.documentElement

// THEME
const affichageTheme = localStorage.getItem("theme")
if (affichageTheme === "sombre") {
    documentHTML.classList.add("sombre")
}

// BOUTONS RADIO
const affichageDispo = localStorage.getItem("affichage")
const conteneur = document.getElementById("conteneur")
const btnsRadio = document.getElementsByName("affichage")

if (conteneur && affichageDispo === "carte") {
    conteneur.classList.remove("tableau")
    conteneur.classList.add("grid")
}

btnsRadio.forEach(btn => {
    btn.addEventListener('click', function () {
        if (conteneur) {
            if (btn.value === "liste") {
                conteneur.classList.remove("grid")
                conteneur.classList.add("tableau")
                afficherApprenants()
            } else {
                conteneur.classList.remove("tableau")
                conteneur.classList.add("grid")
                afficherApprenants()
            }
        }
    })
    if (btn.value === affichageDispo) btn.checked = true
})

// FETCH
function afficherApprenants() {
    if (!conteneur) return
    conteneur.innerHTML = ""
    const modeActuel = conteneur.classList.contains("tableau") ? "liste" : "carte"
    if (modeActuel === "liste") {
        conteneur.innerHTML = `<table><thead><tr>
    <th>Nom</th>
    <th>Prénom</th>
    <th>Ville</th>
    <th>Détails</th>
</tr></thead><tbody></tbody></table>`

        fetch("promo.json")
            .then(response => response.json())
            .then(users => {
                const ligneTableau = document.querySelector("tbody")
                users.apprenants.forEach(element => {
                    ligneTableau.innerHTML += `<tr>
                <td>${element.nom}</td>
                <td>${element.prenom}</td>
                <td>${element.ville}</td>
                <td><a href="#">Détails</a></td>
            </tr>`
                })
            })
    } else {
        fetch("promo.json")
            .then(response => response.json())
            .then(users => {
                users.apprenants.forEach(element => {
                    conteneur.innerHTML += `<div class="carte">
                <p>${element.nom} ${element.prenom}</p>
                <p>${element.ville}</p>
                <p><a href="#">Détails</a></p>
            </div>`
                })
            })
    }
}
afficherApprenants()
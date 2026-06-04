const documentHTML = document.documentElement
let apprenants = []



// THEME
const affichageTheme = localStorage.getItem("theme")
if (affichageTheme === "sombre") {
    documentHTML.classList.add("sombre")
}

// BOUTONS RADIO
const affichageDispo = localStorage.getItem("affichage")
const conteneur = document.getElementById("conteneur")
const btnsRadio = document.getElementsByName("affichage")

if (conteneur && affichageDispo === "carte") { // vérifie que le conteneur existe puis check le storage pour charger le bonne affichage
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

fetch("promo.json")
    .then(response => response.json())
    .then(users => {
        apprenants = users.apprenants
        afficherApprenants()
    })


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

        const ligneTableau = document.querySelector("tbody")
        apprenants.forEach(element => {
            ligneTableau.innerHTML += `<tr>
                <td>${element.nom}</td>
                <td>${element.prenom}</td>
                <td>${element.ville}</td>
                <td><a href="#" data-id="${element.id}" class="btnDetails">Détails</a></td>
            </tr>`
        })

    } else {
        apprenants.forEach(element => {
            conteneur.innerHTML += `<div class="carte">
                <p>${element.nom} ${element.prenom}</p>
                <p>${element.ville}</p>
                <p><a href="#" data-id="${element.id}" class="btnDetails">Détails</a></p>
            </div>`
        })
    }

    const modal = document.querySelector(".modal")
    const btnDetails = document.querySelectorAll(".btnDetails")

    btnDetails.forEach(btn => {
        btn.addEventListener('click', function () {
            const apprenant = apprenants.find(element => element.id === parseInt(btn.dataset.id))

            modal.innerHTML =
                ` <div class="info-modal">
                    <img src="ressources/avatar/${apprenant.avatar}" alt="avatar">
                    <div class="identite">
                        <p class="nomprenom">${apprenant.nom}</p>
                        <p class="nomprenom">${apprenant.prenom}</p>
                        <p class="ville">${apprenant.ville}</p>
                    </div>
                </div>
                <div class="anecdote">
                <p>Anecdotes:</p>
                "${apprenant.anecdotes}"</div>`

                modal.style.display = "flex"

            // if (modal.style.display === "flex") {
            //     modal.style.display = "none"
            // } else {
            //     modal.style.display = "flex"
            // }

        })
    })

    modal.addEventListener('click', function () {
        modal.style.display = "none"
    })

}






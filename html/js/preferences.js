const choixTheme = document.getElementById("theme")
const btnSave = document.getElementById("save")

choixTheme.value = affichageTheme // permet de sélectionner la bonne case en fonction du storage

choixTheme.addEventListener('change', function () {
    if (choixTheme.value === "sombre") {
        documentHTML.classList.remove("clair")
        documentHTML.classList.add("sombre")
    } else {
        documentHTML.classList.remove("sombre")
        documentHTML.classList.add("clair")
    }
})

btnSave.addEventListener('click', function () {
    btnsRadio.forEach(btn => {
        if (btn.checked) localStorage.setItem("affichage", btn.value)
    })
    localStorage.setItem("theme", choixTheme.value)
})
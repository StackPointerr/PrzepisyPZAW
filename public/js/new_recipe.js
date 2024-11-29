const imageToBase64 = (input) =>
    new Promise((resolve, reject) => {
        let file = input.files[0];
        if (!file) {
            resolve("");
        } else {
            let reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        }
    });

let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let nazwa_przepisu = document.getElementById("recipeName").value;
    let opis = document.getElementById("shortDescription").value;
    let kategoria = document.getElementById("category").value;
    let zdjecie = await imageToBase64(document.getElementById("recipeImage"));
    let opis_przygotowania = document.getElementById(
        "preparationDescription",
    ).value;

    let data = { nazwa_przepisu, opis, kategoria, opis_przygotowania, zdjecie };

    fetch("/new_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Nowy przepis: ", response);

            if (response.success) {
                window.location.href = "/";
            } else {
                let element = document.getElementById("error-title");
                if (response.errors.nazwa_przepisu) {
                    element.innerHTML = response.errors.nazwa_przepisu;
                } else {
                    element.innerHTML = "";
                }

                element = document.getElementById("error-description");
                if (response.errors.opis) {
                    element.innerHTML = response.errors.opis;
                } else {
                    element.innerHTML = "";
                }

                element = document.getElementById("error-category");
                if (response.errors.kategoria) {
                    element.innerHTML = response.errors.kategoria;
                } else {
                    element.innerHTML = "";
                }

                element = document.getElementById("error-prep-description");
                if (response.errors.opis_przygotowania) {
                    element.innerHTML = response.errors.opis_przygotowania;
                } else {
                    element.innerHTML = "";
                }

                element = document.getElementById("error-image");
                if (response.errors.zdjecie) {
                    element.innerHTML = response.errors.zdjecie;
                } else {
                    element.innerHTML = "";
                }
            }
        });
});

fetch("/api/category", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
    .then((response) => response.json())
    .then((response) => {
        console.log("Kategorie: ", response);

        if (response.success) {
            let select = document.getElementById("category");
            response.kategorie.forEach((kategoria) => {
                let option = document.createElement("option");
                option.value = kategoria.nazwa;
                option.text = kategoria.nazwa;

                select.appendChild(option);
            });
        }
    });

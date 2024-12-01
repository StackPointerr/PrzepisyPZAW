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

function addToBook(element) {
    fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: element.dataset.id }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Dodaj do książki: ", response);

            if (response.success) {
                element.remove();
            } else {
                alert(response.error);
            }
        });
}

function removeRecipe(element) {
    fetch("/api/recipe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: element.dataset.id }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Usuń przepis: ", response);
            if (response.success) {
                element.closest(".col").remove();
            } else {
                alert(response.error);
            }
        });
}

function searchClick() {
    let nazwa = document.getElementById("name").value;
    let kategoria = document.getElementById("category").value;

    fetch(
        "/api/recipe?" +
            new URLSearchParams({ nazwa: nazwa, kategoria: kategoria }),
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
    )
        .then((response) => response.json())
        .then((response) => {
            console.log("Szukaj: ", response);

            if (response.success) {
                document.getElementById("recipeList").innerHTML = "";

                response.przepisy.forEach((przepis) =>
                    wyswietlPrzepis(przepis),
                );
            }
        });
}

function wyswietlPrzepis(przepis) {
    let recipeTemplate = document
        .getElementById("recipeTemplate")
        .content.cloneNode(true);

    recipeTemplate.querySelector("img").src = "/img/" + przepis.zdjecie;
    recipeTemplate.querySelector("h5").innerText = przepis.nazwa_przepisu;
    recipeTemplate.querySelector("p").innerText = przepis.opis;
    recipeTemplate.querySelector("a").href = "/recipe/" + przepis.id;
    recipeTemplate.querySelector("#addToBook").dataset.id = przepis.id;

    let removeBtn = recipeTemplate.querySelector("#removeRecipe");
    if (przepis.czy_jest_autorem) {
        removeBtn.dataset.id = przepis.id;
    } else {
        removeBtn.style.display = "none";
    }

    let recipeList = document.getElementById("recipeList");
    recipeList.appendChild(recipeTemplate);
}

fetch("/api/recipe", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
    .then((response) => response.json())
    .then((response) => {
        console.log("Pobierz przepisy: ", response);

        if (response.success) {
            response.przepisy.forEach((przepis) => wyswietlPrzepis(przepis));
        } else {
            alert("Błąd pobierania listy przepisów!");
        }
    });

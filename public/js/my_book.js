function removeFromBook(element) {
    fetch("/api/book", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: element.dataset.id }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Usunięto z ksiązki kucharskiej: ", response);

            if (response.success) {
                element.closest(".col").remove();
            } else {
                alert(response.error);
            }
        });
}

function wyswietlKsiazkeKucharska() {
    fetch("/api/book", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Pobierz zawartosc ksiazki: ", response);

            if (response.success) {
                let recipeList = document.getElementById("recipeList");
                recipeList.innerHTML = "";

                response.przepisy.forEach((przepis) => {
                    let recipeTemplate = document
                        .getElementById("recipeTemplate")
                        .content.cloneNode(true);

                    recipeTemplate.querySelector("img").src =
                        "/img/" + przepis.zdjecie;
                    recipeTemplate.querySelector("h5").innerText =
                        przepis.nazwa_przepisu;
                    recipeTemplate.querySelector("p").innerText = przepis.opis;
                    recipeTemplate.querySelector("a").href =
                        "/recipe/" + przepis.id;
                    recipeTemplate.querySelector("#removeFromBook").dataset.id =
                        przepis.id;

                    recipeList.appendChild(recipeTemplate);
                });
            } else {
                alert("Błąd podczas pobierania książki kucharskiej!");
            }
        });
}

wyswietlKsiazkeKucharska();

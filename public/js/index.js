fetch("/api/recipe", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
    .then((response) => response.json())
    .then((response) => {
        console.log("Pobierz przepisy: ", response);

        if (response.success) {
            response.przepisy.forEach((przepis) => {
                let recipeTemplate = document
                    .getElementById("recipeTemplate")
                    .cloneNode(true);

                recipeTemplate.querySelector("img").src =
                    "/img/" + przepis.zdjecie;
                recipeTemplate.querySelector("h5").innerText =
                    przepis.nazwa_przepisu;
                recipeTemplate.querySelector("p").innerText = przepis.opis;
                recipeTemplate.querySelector("a").href =
                    "/recipe/" + przepis.id;
                recipeTemplate.querySelector("#addToBook").dataset.id =
                    przepis.id;

                let removeBtn = recipeTemplate.querySelector("#removeRecipe");
                if (przepis.czy_jest_autorem) {
                    removeBtn.dataset.id = przepis.id;
                } else {
                    removeBtn.style.display = "none";
                }

                let recipeList = document.getElementById("recipeList");
                recipeList.appendChild(recipeTemplate);
            });
        } else {
            alert("Błąd pobierania listy przepisów!");
        }
    });

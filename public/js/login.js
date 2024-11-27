let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let data = { username, password };

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Login response: ", response);
            if (!response.success) {
                let errorField = document.getElementById("error");
                if (response.error) {
                    errorField.innerText = response.error;
                } else {
                    errorField.innerText = "";
                }
            } else {
                setCookie("token", response.token, 14);
                window.location.href = "/";
            }
        });
});

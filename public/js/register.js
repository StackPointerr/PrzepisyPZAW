let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let data = { username, password };

    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Rejestracja response: ", response);
            if (!response.success) {
                let errorLoginField = document.getElementById("error_login");
                if (response.error_login) {
                    errorLoginField.innerText = response.error_login;
                } else {
                    errorLoginField.innerText = "";
                }

                let errorPasswordField =
                    document.getElementById("error_password");
                if (response.error_password) {
                    errorPasswordField.innerText = response.error_password;
                } else {
                    errorPasswordField.innerText = "";
                }
            } else {
                setCookie("token", response.token, 14);
                window.location.href = "/";
            }
        });
});

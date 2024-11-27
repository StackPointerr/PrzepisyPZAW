let logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    let data = {};
    data.token = getCookie("token");

    fetch("/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("Logout response: ", response);
            if (response.success) {
                eraseCookie("token");
                window.location.href = "/login";
            }
        });
});

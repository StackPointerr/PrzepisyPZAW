const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

const db = require("./models");
db.mongoose
    .connect("mongodb://localhost:27017/przepisy", {})
    .then(() => {
        console.log("Polaczono z baza danych");

        const Kategoria = require("./models").kategoria;
        Kategoria.estimatedDocumentCount().then((count) => {
            if (count == 0) {
                new Kategoria({ nazwa: "mięsne" }).save();
                new Kategoria({ nazwa: "jajeczne" }).save();
                new Kategoria({ nazwa: "wegańskie" }).save();
                new Kategoria({ nazwa: "mleczne" }).save();
            }
        });
    })
    .catch((error) => {
        console.error("Blad polaczenia z baza danych: ", error);
    });

app.use(
    "/css",
    express.static(__dirname + "/node_modules/bootstrap/dist/css/"),
);

app.use(
    "/bootstrap-icons",
    express.static(__dirname + "/node_modules/bootstrap-icons/font/"),
);

app.use("/img", express.static(__dirname + "/public/img"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));

const index_router = require("./routes/index");
const login_router = require("./routes/login");
const register_router = require("./routes/register");
const logout_router = require("./routes/logout");
const recipe_router = require("./routes/recipe");
const my_book_router = require("./routes/my_book");
const new_recipe_router = require("./routes/new_recipe");

app.use("/", index_router);
app.use("/login", login_router);
app.use("/register", register_router);
app.use("/logout", logout_router);
app.use("/recipe", recipe_router);
app.use("/my_book", my_book_router);
app.use("/new_recipe", new_recipe_router);

const api_router = require("./routes/api/category");
const recipeApiRouter = require("./routes/api/recipe");
const bookApiRouter = require("./routes/api/book");

app.use("/api/category", api_router);
app.use("/api/recipe", recipeApiRouter);
app.use("/api/book", bookApiRouter);

app.listen(3000, () => {
    console.log("Nasluchuje na porcie 3000");
});

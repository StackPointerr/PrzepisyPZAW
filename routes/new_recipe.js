const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const fs = require("fs");

const Kategoria = require("../models").kategoria;
const Przepis = require("../models").przepis;
const loggedJson = require("../middleware").loggedJson;

const handleImage = (image) => {
    if (!image) return;

    let magic = {
        jpg: "ffd8ffe0",
        png: "89504e47",
        gif: "47494638",
    };

    image = Buffer.from(image.replace("data:image/png;base64,", ""), "base64");

    let imageMagic = image.toString("hex", 0, 4);
    let extension = Object.keys(magic).find((key) => magic[key] == imageMagic);

    let data = { image, extension };

    return data;
};

router.get("/", (req, res) => {
    res.render("new_recipe", { title: "Stwórz nowy przepis" });
});

router.post("/", loggedJson, async (req, res) => {
    let response = { errors: {} };
    response.success = true;

    let nazwa_przepisu = req.body.nazwa_przepisu;
    let opis = req.body.opis;
    let kategoria = await Kategoria.findOne({ nazwa: req.body.kategoria });
    let opis_przygotowania = req.body.opis_przygotowania;
    let zdjecie = handleImage(req.body.zdjecie);

    if (
        !nazwa_przepisu ||
        nazwa_przepisu.length <= 5 ||
        nazwa_przepisu.nazwa_przepisu > 50
    ) {
        response.errors.nazwa_przepisu =
            "Podaj poprawną nazwe przepisu mieszczącą się w zakresie od 5 do 50 znaków!";
        response.success = false;
    }

    if (!opis || opis.length <= 5 || opis.length > 500) {
        response.errors.opis =
            "Poprawny opis przepisu powinien zawierać od 5 do 500 znaków!";
        response.success = false;
    }

    if (!kategoria) {
        response.errors.kategoria = "Wybierz poprawną kategorie!";
        response.success = false;
    }

    if (
        !opis_przygotowania ||
        opis_przygotowania.length <= 5 ||
        opis_przygotowania.length > 500
    ) {
        response.errors.opis_przygotowania =
            "Poprawny opis przygotowania przepisu powinien zawierać od 5 do 500 znaków!";
        response.success = false;
    }

    if (!zdjecie?.extension) {
        response.errors.zdjecie =
            "Upewnij sie że wybrany plik jest poprawnym zdjęciem, obsługiwane typy zdjeć to png, jpeg i gif";
        response.success = false;
    }

    if (response.success) {
        let randomFilename =
            crypto.randomBytes(5).toString("hex") + "." + zdjecie.extension;
        let imagePath = __dirname + "/../public/img/" + randomFilename;

        fs.writeFile(imagePath, zdjecie.image, (err) => {
            if (err) console.error("Bład podczas zapisywania zdjęcia: ", err);
        });

        let przepis = new Przepis({
            autor: req.user,
            nazwa: nazwa_przepisu,
            opis: opis,
            opis_przygotowania: opis_przygotowania,
            zdjecie: randomFilename,
            kategoria: kategoria,
            data_utworzenia: new Date(),
        });

        przepis.save();
    }

    res.send(response);
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Przepis = require("../../models").przepis;
const Ksiazka = require("../../models").ksiazka;

const loggedJson = require("../../middleware").loggedJson;

router.delete("/", loggedJson, async (req, res) => {
    let recipeId = req.body.recipeId;

    Ksiazka.findOneAndDelete({ uzytkownik: req.user, przepis: recipeId }).then(
        (ksiazka) => {
            if (ksiazka) {
                res.send({ success: true });
            } else {
                res.send({
                    success: false,
                    error: "Przepis o podanym id nie jest w książce kucharskiej",
                });
            }
        },
    );
});

router.post("/", loggedJson, async (req, res) => {
    let recipeId = req.body.recipeId;

    let przepis = await Przepis.findOne({ _id: recipeId });
    let istniejacaKsiazka = await Ksiazka.findOne({
        przepis: recipeId,
        uzytkownik: req.user,
    });

    if (!przepis) {
        res.send({ success: false, error: "Nie poprawnie id przepisu!" });
    } else if (istniejacaKsiazka) {
        res.send({
            success: false,
            error: "Podany przepis jest już dodany do ksiązki kucharskiej!",
        });
    } else {
        let ksiazka = new Ksiazka({ uzytkownik: req.user, przepis: przepis });
        await ksiazka.save();

        res.send({ success: true });
    }
});

router.get("/", loggedJson, async (req, res) => {
    let ksiazka = await Ksiazka.find({ uzytkownik: req.user }).populate(
        "przepis",
    );

    let przepisy = ksiazka.map((entry) => ({
        id: entry.przepis._id,
        nazwa_przepisu: entry.przepis.nazwa,
        opis: entry.przepis.opis,
        zdjecie: entry.przepis.zdjecie,
    }));

    res.send({ success: true, przepisy: przepisy });
});

module.exports = router;

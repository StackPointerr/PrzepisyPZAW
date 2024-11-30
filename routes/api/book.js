const express = require("express");
const router = express.Router();

const Przepis = require("../../models").przepis;
const User = require("../../models").user;

const loggedJson = require("../../middleware").loggedJson;

router.delete("/", loggedJson, async (req, res) => {
    User.updateOne(
        { _id: req.user._id },
        { $pull: { ksiazka_kucharska: req.body.recipeId } },
    ).then((result) => {
        if (result.modifiedCount > 0) {
            res.send({ success: true });
        } else {
            res.send({
                success: false,
                error: "Przepis o podanym id nie jest w książce kucharskiej",
            });
        }
    });
});

router.post("/", loggedJson, async (req, res) => {
    Przepis.findOne({ _id: req.body.recipeId }).then((przepis) => {
        let istniejacaKsiazka = req.user.ksiazka_kucharska.find((ksiazka) =>
            ksiazka._id.equals(recipeId),
        );

        if (!przepis) {
            res.send({ success: false, error: "Nie poprawnie id przepisu!" });
        } else if (istniejacaKsiazka) {
            res.send({
                success: false,
                error: "Podany przepis jest już dodany do ksiązki kucharskiej!",
            });
        } else {
            req.user.ksiazka_kucharska.push(przepis);
            req.user.save();

            res.send({ success: true });
        }
    });
});

router.get("/", loggedJson, async (req, res) => {
    let user = await req.user.populate("ksiazka_kucharska");

    let przepisy = user.ksiazka_kucharska.map((przepis) => ({
        id: przepis._id,
        nazwa_przepisu: przepis.nazwa,
        opis: przepis.opis,
        zdjecie: przepis.zdjecie,
    }));

    res.send({ success: true, przepisy: przepisy });
});

module.exports = router;

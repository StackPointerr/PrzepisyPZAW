const express = require("express");
const fs = require("fs");
const router = express.Router();

const Przepisy = require("../../models").przepis;
const User = require("../../models").user;

const loggedJson = require("../../middleware/index").loggedJson;

router.get("/", loggedJson, async (req, res) => {
    let przepisy = await Przepisy.find({}).populate(["autor", "kategoria"]);
    przepisy = przepisy.map((przepis) => ({
        id: przepis._id,
        nazwa_przepisu: przepis.nazwa,
        opis: przepis.opis,
        opis_przygotowania: przepis.opis_przygotowania,
        zdjecie: przepis.zdjecie,
        kategoria: przepis.kategoria.nazwa,
        data_utworzenia: przepis.data_utworzenia,
        autor: przepis.autor.username,
        czy_jest_autorem: przepis.autor._id.equals(req.user._id),
    }));

    res.send({
        success: true,
        przepisy: przepisy,
    });
});

router.delete("/", loggedJson, async (req, res) => {
    Przepisy.findOne({ _id: req.body.recipeId }).then(async (przepis) => {
        if (!przepis) {
            res.send({
                success: false,
                error: "Przepis o podanym id nie istnieje!",
            });
        } else if (!req.user._id.equals(przepis.autor)) {
            res.send({
                success: false,
                error: "Podany użytkownik nie jest autorem przepisu!",
            });
        } else {
            fs.rmSync(__dirname + "/../../public/img/" + przepis.zdjecie);

            await Przepisy.deleteOne({ _id: req.body.recipeId });
            await User.updateMany(
                {},
                { $pull: { ksiazka_kucharska: przepis._id } },
            );

            res.send({ success: true });
        }
    });
});

module.exports = router;

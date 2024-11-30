const express = require("express");
const router = express.Router();

const Przepisy = require("../../models").przepis;

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

module.exports = router;

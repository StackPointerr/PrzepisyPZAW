const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const Przepis = mongoose.model(
    "Przepis",
    {
        autor: {
            type: Types.ObjectId,
            ref: "User",
        },
        nazwa: String,
        opis: String,
        opis_przygotowania: String,
        zdjecie: String,
        kategoria: {
            type: Types.ObjectId,
            ref: "Kategoria",
        },
        data_utworzenia: Types.Date,
    },
    "przepisy",
);

module.exports = Przepis;

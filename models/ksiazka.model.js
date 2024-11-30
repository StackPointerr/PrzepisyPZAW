const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const Ksiazka = mongoose.model(
    "Ksiazka",
    {
        uzytkownik: {
            type: Types.ObjectId,
            ref: "User",
        },
        przepis: {
            type: Types.ObjectId,
            ref: "Przepis",
        },
    },
    "ksiazka",
);

module.exports = Ksiazka;

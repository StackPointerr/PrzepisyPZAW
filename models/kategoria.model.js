const mongoose = require("mongoose");

const Kategoria = mongoose.model(
    "Kategoria",
    {
        nazwa: String,
    },
    "kategoria",
);

module.exports = Kategoria;

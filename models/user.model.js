const mongoose = require("mongoose");

const Types = mongoose.Schema.Types;

const User = mongoose.model(
    "User",
    {
        username: String,
        password: String,
        ksiazka_kucharska: [
            {
                type: Types.ObjectId,
                ref: "Przepis",
            },
        ],
    },
    "users",
);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = mongoose.model(
    "Token",
    {
        token: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    "tokens",
);

module.exports = Token;

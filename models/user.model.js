const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    {
        username: String,
        password: String,
    },
    "users",
);

module.exports = User;

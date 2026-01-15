const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "host"],
        default: "user", // normal user by default
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipes",
        },
    ],
})

module.exports = mongoose.model("user", userSchema);
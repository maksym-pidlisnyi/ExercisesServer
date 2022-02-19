const mongoose = require("mongoose");

const Exercise = mongoose.model(
    "Exercise",
    new mongoose.Schema({
        name: {
            type: String
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        imagePrimary: {
            type: String
        },
        imageSecondary: {
            type: String
        },
        equipment: {
            type: String
        },
        difficulty: {
            type: String
        },
        url: {
            type: String
        }
    })
);

module.exports = Exercise;
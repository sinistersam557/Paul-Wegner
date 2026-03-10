const mongoose = require("mongoose")
require('../connections/mongoConnection')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    location: {
        type: String
    },
    about: {
        type: String
    },
    interests: {
        type: [String]
    }
});

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
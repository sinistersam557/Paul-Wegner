require('dotenv').config({});
const { HOST, DATABASE, DB_USER, DB_PASS } = process.env

const mongoose = require('mongoose')

const MONGODB_URI = `mongodb://${DB_USER}:${DB_PASS}@${HOST}/${DATABASE}`
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected:', MONGODB_URI)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
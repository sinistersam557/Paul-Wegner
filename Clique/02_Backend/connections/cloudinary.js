//dotenv
require('dotenv').config({path: './.env.dev'})
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env

//import the cloudinary library
const cloudinary = require('cloudinary').v2;

console.log("Cloud Name:", CLOUD_NAME)

//configure the cloudinary connection
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

//export cloudinary
module.exports = cloudinary;
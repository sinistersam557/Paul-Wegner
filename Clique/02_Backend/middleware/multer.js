const multer = require('multer')
const path = require('path')

//setup disk storage strategy with multer
const storageStrategy = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // folder on the server
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) // uses the original name of file
    }
})

//create a multer instance with storage defined as above
const uploads = multer({
    storage: storageStrategy,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit files to 5 MB
    fileFilter: (req, file, cb) => {
        cb(null, true)
    }
})

module.exports = uploads;
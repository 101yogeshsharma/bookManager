const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    rating : Number,

    description : String,

    cover : String,

    uploadDatw : {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('booksData', booksSchema)
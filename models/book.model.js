const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        trim: true
    },
    coverImage: {
        type: String, // Esto se asume que es una URL.
        trim: true
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }]
});

const Book = mongoose.model("Book", bookSchema)
module.exports = Book
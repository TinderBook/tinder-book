const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema_({
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
        type: String,
        trim: true
    }
});

const Book = mongoose.model("Book", bookSchema)
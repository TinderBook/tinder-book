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
        trim: true,
        default: 'https://via.placeholder.com/150x200?text=Libro',
        validate: {
            validator: function(url) {
                try {
                    new URL(url);
                    return true;
                } catch(error) {
                    return false;
                }
            }
        }
    }
});

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
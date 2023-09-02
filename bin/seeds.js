require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/book.model')
const booksData = require('../data/books.json')
console.log(booksData)

require('../config/db.config')



mongoose.connection
    .dropDatabase()
    .then(() => {
        Book.create(booksData)
    })
    .catch(error => {
        console.error("Error creating books")
    })
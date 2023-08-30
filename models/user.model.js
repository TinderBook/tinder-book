// book.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,   // Esto se asume que es una URL.
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  likedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

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
  likedBooks: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }],
    validate: [arrayLimit, 'Seleccion exceeds the limit of 4 books']
  }
});

const User = mongoose.model('User', userSchema);

function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = User;

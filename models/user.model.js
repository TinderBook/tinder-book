
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: 'User name is required',
    trim: true
  },
  email: {
    type: String,
    required: 'User name is required',
    lowercase: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: 'User username is required',
    trim: true,
    unique: true,
    validate: {
      validator: function(value) {
        return !value.includes(' ')
      },
      message: 'Invalid username, username can not contains white spaces'
    }
  },
  password: {
    type: String,
    required: 'User password is required',
    minLength: [8, 'User password needs at least 8 chars']
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

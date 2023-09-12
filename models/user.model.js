
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const WORK_FACTOR = 10;


const userSchema = new Schema({
  name: {
    type: String,
    required: 'User name is required',
    trim: true
  },
  email: {
    type: String,
    required: 'Email is required',
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
      validator: function (value) {
        return !value.includes(' ')
      },
      message: 'Invalid username, username can not contains white spaces'
    }
  },
  dateOfBirth: {
    type: Date,
    required: 'User date of birth is required'
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true
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
  avatarUrl: {
    type: String,   // Esto se asume que es una URL.
    trim: true,
    default: function () {
      return `https://i.pravatar.cc/200?u=${this.email}`
    }
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
  },

});

//Para obtener la edad segun la fecha de nacimiento
userSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

function arrayLimit(val) {
  return val.length <= 4;
}

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, WORK_FACTOR)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => next(error))
  } else {
    next();
  }
})


userSchema.methods.checkPassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;

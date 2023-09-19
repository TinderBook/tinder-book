const User = require('../models/user.model');
const mongoose = require("mongoose");
const Book = require("../models/book.model");

module.exports.register = (req, res, next) => {
  Book.find()
    .then((books) => res.render('users/register', { books }))
    .catch((error) => next(error))

}

module.exports.doRegister = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return Book.find()
            .then((books) => {
                res.render('users/register', {
                    user: req.body,
                    books: books,
                    errors: {
                        username: 'Username already exists',
                    }
                })
            })
    } else {
        return User.findOne({ email: req.body.email })
            .then(userWithEmail => {
              if (userWithEmail) {
                return Book.find()
                    .then((books) => {
                        res.render('users/register', {
                            user: req.body,
                            books: books,
                            errors: {
                                email: 'Email already in use',
                            }
                        });
                    });
            } else {
              
              req.body.likedBooks = typeof req.body.likedBooks === 'string' ? [req.body.likedBooks] : req.body.likedBooks;

              return User.create(req.body)
                .then(() => {
                    res.redirect('/login')
                });
              }
            });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        Book.find()
          .then((books) => {
            res.render('users/register', {
              user: req.body,
              books: books,
              errors: error.errors
            })
          })
          .catch((error) => next(error));
      } else {
          next(error)
      }
    })
}



module.exports.login = (req, res, next) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {

  function renderInvalidUsername() {
    res.render('users/login', {
      user: req.body,
      errors: {
          password: 'Invalid username or password'
      }
  })
  }

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return user.checkPassword(req.body.password)
            .then((match) => {
              if (match) {
                  req.session.userId = user.id;
                  res.redirect('/dashboard')
              } else {
                  renderInvalidUsername();
              }
            })
      } else {
          renderInvalidUsername();
      }
  })
    .catch((error) => next(error));
}


module.exports.profile = (req, res, next) => {
  User.findById(req.user)
    .populate('likedBooks')
    .then(user => {
      user._id = user._id.toString();
      res.render('users/profile', { user: user })
    })
    .catch(error => next(error))
}


module.exports.editDescription = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
  }, { new: true })
    .then(() => {
        res.redirect('/user/profile')
    })
    .catch((error) => next(error))
}


module.exports.editProfile = (req, res, next) => {

  User.findById(req.user)

    .then(user => {

      return Book.find()
        .then((books) => {
          res.render('users/edit', { user, books });
        });
    })
    .catch((error) => next(error))

}

module.exports.doEditProfile = (req, res, next) => {

  User.findOne({ username: req.body.username })
    .then(existingUser => {
      if (existingUser && String(existingUser._id) !== String(req.params.id)) {

        return Book.find()
          .then(books => {
              res.render('users/edit', {
                user: req.body,
                books: books,
                errors: {
                  username: 'username already exists',
                }
              })
            })
        } else {

          req.body.likedBooks = typeof req.body.likedBooks === 'string' ? [req.body.likedBooks] : req.body.likedBooks

          let updates = {
            username: req.body.username,
            description: req.body.description,
            likedBooks: req.body.likedBooks,
          };
          if (req.file && req.file.path) {
            updates.avatarUrl = req.file.path;
          }
          return User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
            .then(() => res.redirect("/user/profile"));
        }
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          Book.find()
            .then(books => {
              res.render('users/edit', {
                user: req.body,
                errors: error.errors,
                books: books
              });
            })
            .catch(error => next(error))
        } else {
          next(error);
        }
      });
}


module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/')
}
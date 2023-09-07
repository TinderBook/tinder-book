const Like = require('../models/like.model.js');
const User = require('../models/user.model.js');

module.exports.likeUser = (req, res, next) => {   
    const fromUser = req.session.userId;
    const toUser = req.params.id;

    Like.findOne({ fromUser: fromUser, toUser: toUser })
        .then(existingLikes => {
            if (existingLikes) {
                return Like.deleteOne({ fromUser: fromUser, toUser: toUser })
            } else {
                return Like.create({ fromUser: fromUser, toUser: toUser })
                    .then(like => {
                        // existe en el otro sentido?
                            // si existe, creo el match
                            // redirijo al dashboard con un query param para mostrar un mensajito
                    })
            }
        })
        .then(() => {
            res.redirect('/dashboard')
        })
        .catch(error => {
            next(error)
        })

    }

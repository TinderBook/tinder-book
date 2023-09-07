const Like = require("../models/like.model.js");
const User = require("../models/user.model.js");
const Match = require("../models/match.model.js");

module.exports.likeUser = (req, res, next) => {
  const fromUser = req.user.id;
  const toUser = req.params.id;

  Like.findOne({ fromUser: fromUser, toUser: toUser })
    .then((existingLikes) => {
      if (existingLikes) {
        return Like.deleteOne({ fromUser: fromUser, toUser: toUser });
      } else {
        return Like.create({ fromUser: fromUser, toUser: toUser }).then(
          (like) => {
            // existe en el otro sentido?
            return (
              Like.findOne({ fromUser: toUser, toUser: fromUser })
                // si existe, creo el match
                .then((existingLike) => {
                  // redirijo al dashboard con un query param para mostrar un mensaje
                  if (existingLike) {
                    return Match.create({
                      user1: toUser,
                      user2: fromUser,
                    });
                  }
                })
            );
          }
        );
      }
    })
    .then(() => {
      res.redirect("/dashboard");
    })
    .catch((error) => {
      next(error);
    });
};

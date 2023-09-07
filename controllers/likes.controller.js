const Like = require("../models/like.model.js");
const User = require("../models/user.model.js");
const Match = require("../models/match.model.js");

const createLike = (fromUser, toUser) => {
  return Like.create({fromUser, toUser});
}

const removeLike = (fromUser, toUser) => {
  return Like.deleteOne({fromUser, toUser});
}
const checkForMutualLike = (fromUser, toUser) => {
  return Like.findOne({fromUser: toUser, toUser: fromUser});
}

const createMatch = (user1, user2) => {
  return Match.create({user1, user2});
}

module.exports.likeUser = (req, res, next) => {
  const fromUser = req.user.id;
  const toUser = req.params.id;

  Like.findOne({ fromUser: fromUser, toUser: toUser })
    .then((existingLikes) => {
      if (existingLikes) {
        return removeLike(fromUser, toUser);
      } else {
        return createLike(fromUser, toUser)
          .then(() => checkForMutualLike(fromUser, toUser))
          .then((existingLike) => {
            if(existingLike){
              return createMatch(toUser, fromUser).then(() => {
                req.flash("success", "It's a Match")
              });
            } 
          });
      }
    
  })
  .then(() => {
    res.redirect("/dashboard");
  })
  .catch((error) => {
    next(error);
  });
};

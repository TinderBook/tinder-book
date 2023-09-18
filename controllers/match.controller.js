const Match = require('../models/match.model');

module.exports = {
  viewMyMatches: (req, res, next) => {
    const userId = req.user.id;
    Match.find({ $or: [{ user1: userId }, { user2: userId }] })
      .populate({
        path: 'user1',
        populate: { path: 'likedBooks' }
      })
      .populate({
        path: 'user2',
        populate: { path: 'likedBooks' }
      })
      .then(matches => {
        const matchedUsers = matches
          .filter(match => match.user1 && match.user2)  // Filtramos los matches donde ambos usuarios existen
          .map(match => {
              let user = match.user1._id.toString() === userId ? match.user2 : match.user1;
              return {
                  user: user,
                  matchId: match._id.toString()
              };
          });
        if(matchedUsers.length === 0){
          return res.render('users/my-matches', { noMatches: true })
        }  

        res.render('users/my-matches', { matches: matchedUsers });
        
      })
        .catch(err => next(err));
  },
  

  matchDetails: (req, res, next) => {
    Match.findById(req.params.id)
      .populate('user1')
      .populate('user2')
      .populate({
        path: 'messages',
        populate: {
            path: 'sender',
            model: 'User'
        }
      })
      .then(match => {
        let otherUser = match.user1._id.toString() === req.session.userId ? match.user2 : match.user1;

        if (!match.notified) {
            match.notified = true;
            return match.save()
                .then(() => {
                    res.render("matches/details", { match, otherUser });
                });
        } else {
            res.render("matches/details", { match, otherUser });
        }
      })
      .catch(err => next(err));
  }
}

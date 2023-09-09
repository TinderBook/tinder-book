 const Message = require('../models/message.model')
 const Match = require('../models/match.model')


module.exports.doCreate = (req, res, next) => {

  Message.create({
    content: req.body.content,
    sender: req.user._id,
    match: req.params.id
  })
  .then(() => {
    res.redirect(`/match/${req.params.id}`)
  })
  .catch(err => next(err));
}
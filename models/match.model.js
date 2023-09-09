
require('./message.model')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

matchSchema.virtual('messages', {

  ref: "Messages",
  localField: "_id",
  foreignField: "match",
  justOne: false,

})


const Match = mongoose.model('Match', matchSchema);



module.exports = Match;

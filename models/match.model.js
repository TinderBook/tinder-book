
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

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;

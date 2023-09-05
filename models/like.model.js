const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    fromUser: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
});

likeSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

const Like = mongoose.model('like', likeSchema);

module.exports = Like;


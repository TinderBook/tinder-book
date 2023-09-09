const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message;


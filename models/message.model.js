const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    content: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    match: {
      type: Schema.Types.ObjectId,
      ref: 'Match'
    },
    isRead: {
      type: Boolean,
      default: false  
    },
    timestamp: {
        type: Date,
        default: Date.now
    }    
  });
  
   const Message = mongoose.model('Messages', messageSchema);
   
   module.exports = Message;


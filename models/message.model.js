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
}, { 
    timestamps: true
});
  
   const Message = mongoose.model('Messages', messageSchema);
   
   module.exports = Message;


const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the sender
    required: true,
  }, 
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', // Reference to the Group model for the group
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const GroupMessage = mongoose.model('GroupMessage', messageSchema);

module.exports = GroupMessage;

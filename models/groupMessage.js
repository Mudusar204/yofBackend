const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }, 
  user: {
    _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the sender
    required: true,},
    name:String
  }, 
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', // Reference to the Group model for the group
    required: true,
  },
  
},
{
  timestamps: true,
});

const GroupMessage = mongoose.model('GroupMessage', messageSchema);

module.exports = GroupMessage;

const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model for the sender
          required: true,
        },
        name: String,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  groupIcon: String, // Store URL to the group's icon/image
  // Add more properties for additional features like group settings, pinned messages, etc.
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

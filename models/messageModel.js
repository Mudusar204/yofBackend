const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    // message: {
    //   text: { type: String, required: true },
    // },
    // users: Array,
    // sender: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    to:String,
    text: String, // The text of the message
    user: {
      _id: String, // User's unique identifier
      name: String, // User's name
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);

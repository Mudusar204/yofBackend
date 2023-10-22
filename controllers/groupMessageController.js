const GroupMessage = require("../models/groupMessage"); // Import the GroupMessage model

const sendMessageInGroup = async (req, res) => {
console.log("msd sending",req.body);

  const { text, user, group } = req.body; // Extract message content, sender, and group from the request body
let sender=user._id
  try {
    // Create a new message instance using the GroupMessage model
    const newMessage = new GroupMessage({
      text, 
      user, 
      group,
    });
    // Save the message to the database
    await newMessage.save();
    console.log("msd sent in gorup");

    // Respond with a success message and the created message data
    return res
      .status(201)
      .json({ message: "Message sent successfully", message: newMessage });
  } catch (error) {
    console.log(error.message);
    // Handle any errors, e.g., validation errors or database errors
    return res
      .status(500)
      .json({ error: "Message sending failed", message: error.message });
  }
};

// Controller function to get the chat of a group
const getGroupChat = async (req, res) => {

  const groupId = req.params.groupId; // Get the group ID from the request parameters
console.log(groupId,"group id");
  try {
    // Find all messages in the specified group
    const messages = (await GroupMessage.find({ group: groupId }).sort({ createdAt: 1 }));
console.log(messages,'group chat');
    // Respond with the list of messages
    return res.status(200).json({ messages });

  } catch (error) {
    // Handle any errors, e.g., database errors
    return res
      .status(500)
      .json({ error: "Failed to retrieve group chat", message: error.message });
  }
};

// Controller function to delete the chat of a group
const deleteGroupChat = async (req, res) => {
  const groupId = req.params.groupId; // Get the group ID from the request parameters

  try {
    // Delete all messages in the specified group
    await GroupMessage.deleteMany({ group: groupId });

    // Respond with a success message
    return res.status(200).json({ message: "Group chat deleted successfully" });
  } catch (error) {
    // Handle any errors, e.g., database errors
    return res
      .status(500)
      .json({ error: "Failed to delete group chat", message: error.message });
  }
};

module.exports = {
  sendMessageInGroup,
  deleteGroupChat,
  getGroupChat,
};

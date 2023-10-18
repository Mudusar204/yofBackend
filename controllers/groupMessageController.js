const GroupMessage = require("../models/groupMessage"); // Import the GroupMessage model

// Controller function to send a message in a group
const sendMessageInGroup = async (req, res) => {
  const { text, sender, group } = req.body; // Extract message content, sender, and group from the request body

  try {
    // Create a new message instance using the GroupMessage model
    const newMessage = new GroupMessage({
      text,
      sender, 
      group,
    });

    // Save the message to the database
    await newMessage.save();

    // Respond with a success message and the created message data
    return res
      .status(201)
      .json({ message: "Message sent successfully", message: newMessage });
  } catch (error) {
    // Handle any errors, e.g., validation errors or database errors
    return res
      .status(500)
      .json({ error: "Message sending failed", message: error.message });
  }
};

// Controller function to get the chat of a group
const getGroupChat = async (req, res) => {
  const groupId = req.params.groupId; // Get the group ID from the request parameters

  try {
    // Find all messages in the specified group
    const messages = await GroupMessage.find({ group: groupId });

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

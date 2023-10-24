const GroupMessage = require("../models/groupMessage"); // Import the GroupMessage model
const Group = require("../models/groupModel");
// const sendMessageInGroup = async (req, res) => {
// console.log("msd sending",req.body);

//   const { text, user, group } = req.body; // Extract message content, sender, and group from the request body
// let sender=user._id
//   try {
//     // Create a new message instance using the GroupMessage model
//     const newMessage = new GroupMessage({
//       text,
//       user,
//       group,
//     });
//     // Save the message to the database
//     await newMessage.save();
//     console.log("msd sent in gorup");

//     // Respond with a success message and the created message data
//     return res
//       .status(201)
//       .json({ message: "Message sent successfully", message: newMessage });
//   } catch (error) {
//     console.log(error.message);
//     // Handle any errors, e.g., validation errors or database errors
//     return res
//       .status(500)
//       .json({ error: "Message sending failed", message: error.message });
//   }
// };

// Controller function to get the chat of a group

const sendMessageInGroup = async (req, res) => {
  const { groupId, text, userId, userName } = req.body; // Extract group ID, message content, sender ID, and sender name from the request body
  console.log(req.body, "body");
  try {
    // Find the group by its ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Create a new message object
    const newMessage = {
      text,
      user: {
        _id: userId,
        name: userName,
      },
    };

    // Add the message to the group's messages array
    group.messages.push(newMessage);

    // Save the updated group to the database
    await group.save();
    console.log("sent messge");

    // Respond with a success message and the updated group data
    return res
      .status(201)
      .json({ message: "Message sent successfully", group });
  } catch (error) {
    console.log(error.message, "sent messge");

    return res.status(500).json({
      error: "Message sending failed",
      message: error.message,
    });
  }
};

// const getGroupChat = async (req, res) => {

//   const groupId = req.params.groupId; // Get the group ID from the request parameters
// console.log(groupId,"group id");
//   try {
//     // Find all messages in the specified group
//     const messages = (await GroupMessage.find({ group: groupId }).sort({ createdAt: 1 }));
// console.log(messages,'group chat');
//     // Respond with the list of messages
//     return res.status(200).json({ messages });

//   } catch (error) {
//     // Handle any errors, e.g., database errors
//     return res
//       .status(500)
//       .json({ error: "Failed to retrieve group chat", message: error.message });
//   }
// };

// Controller function to delete the chat of a group

const getGroupChat = async (req, res) => {
  const groupId = req.params.groupId; // Get the group ID from the request parameters

  try {
    // Find the group by its ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Get the messages of the group
    const messages = group.messages;

    // Respond with the list of messages
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to retrieve group messages",
      message: error.message,
    });
  }
};
const deleteGroupChat = async (req, res) => {
  try {
    const groupId = req.params.groupId; // Get the group ID from the request parameters

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Remove all messages from the group's messages array
    group.messages = [];

    // Save the updated group to the database
    await group.save();
    console.log("deleted");
    return res
      .status(200)
      .json({ message: "All messages in the group deleted successfully" });
  } catch (error) {
    console.log(error.message, "error");
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

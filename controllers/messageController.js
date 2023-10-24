const Messages = require("../models/messageModel");
const userSchema = require("../models/User");
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to, name1, name2 } = req.body;
    console.log(from, to, "req, cali get messages wali============");
    const searchCriteria = {
      $or: [
        {
          $and: [
            { to: to }, // Replace 'your_id_value' with the desired _id
            { user: { _id: from, name: name1 } }, // Replace 'desired_name' with the desired name
          ],
        },
        {
          $and: [
            { to: from }, // Replace 'your_id_value' with the desired _id
            { user: { _id: to, name: name2 } }, // Replace 'desired_name' with the desired name
          ],
        },
      ],
    };
    const messages = await Messages.find(searchCriteria).sort({ createdAt: 1 });

    console.log(messages, "========messages=========");
    res.json(messages);
  } catch (ex) {
    console.log(ex.message, "error while getting message");
    next(ex);
  }
};

module.exports.delMessages = async (req, res, next) => {
  try {
    const { from, to, name1, name2 } = req.body;
    console.log(from, to, "req, cali del messages wali============");
    const searchCriteria = {
      $or: [
        {
          $and: [
            { to: to }, // Replace 'your_id_value' with the desired _id
            { user: { _id: from, name: name1 } }, // Replace 'desired_name' with the desired name
          ],
        },
        {
          $and: [
            { to: from }, // Replace 'your_id_value' with the desired _id
            { user: { _id: to, name: name2 } }, // Replace 'desired_name' with the desired name
          ],
        },
      ],
    };
    const messages = await Messages.deleteMany(searchCriteria);

    console.log(messages, "========messages=========");
    res.json("msgs deleted");
  } catch (ex) {
    console.log(ex.message, "error while getting message");
    next(ex);
  }
};
module.exports.addMessage = async (req, res, next) => {
  try {
    console.log(req.body, "=========coming message==========");
    const { to, text, user } = req.body;
    const data = await Messages.create({
      text: text,
      to: to,
      user: user,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getChatsOfUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user's ID from the request parameters

    // const groups = await Group.find({ members: userId });
    const chats = await Messages.find({
      "user._id": userId,
    });

    let arrayOfUser = [];
    let a = chats.map((chat) => {
      if (!arrayOfUser.includes(chat.to)) {
        console.log(chat, "chat");
        arrayOfUser.push(chat.to);
      }
    });
    console.log(
      arrayOfUser,
      "=========",
      chats,
      " while getting chats",
      userId
    );
    const users = arrayOfUser.map(async (user) => {
    let item= await userSchema.find({ _id: user });
    return item[0]
    });
    const usersArray = await Promise.all(users);
    console.log('=======',usersArray);
    return res.status(200).json({ usersArray });
  } catch (error) {
    console.log(error.message, "errro while getting chats");
    return res
      .status(500)
      .json({ error: "Failed to retrieve groups", message: error.message });
  }
};

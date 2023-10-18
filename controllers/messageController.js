const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to ,name1,name2} = req.body;
console.log(from,to,"req, cali get messages wali============");
const searchCriteria = {
  $or: [
    {$and:[
      { to: to }, // Replace 'your_id_value' with the desired _id
      { user: {_id:from,name:name1} }, // Replace 'desired_name' with the desired name
    ]},
    {$and:[
      { to: from }, // Replace 'your_id_value' with the desired _id
      { user: {_id:to,name:name2} }, // Replace 'desired_name' with the desired name
    ]}
  ],
  
};
    const messages = await Messages.find(searchCriteria).sort({ createdAt: 1 });

   
    console.log(messages,"========messages=========");
    res.json(messages);
  } catch (ex) {
    console.log(ex.message,"error while getting message");
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    console.log(req.body,"=========coming message==========");
    const {  to, text,user } = req.body;
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

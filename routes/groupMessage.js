const {
  sendMessageInGroup,
  deleteGroupChat,
  getGroupChat,
} = require("../controllers/groupMessageController");
const router = require("express").Router();

router.post("/sendMessageInGroup", sendMessageInGroup);
router.delete("/deleteGroupChat/:groupId", deleteGroupChat);
router.get("/getGroupChat/:groupId", getGroupChat);

module.exports = router;
  
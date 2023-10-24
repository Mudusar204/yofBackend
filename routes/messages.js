const { addMessage, getMessages ,getChatsOfUser,delMessages} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.get("/getChatsOfUser/:userId", getChatsOfUser);
router.post("/getmsg/", getMessages);
router.post("/delMessages", delMessages);

module.exports = router;

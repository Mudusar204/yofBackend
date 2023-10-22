const {
  createGroup,
  deleteGroup,
  removeMemberFromGroup,
  addMemberToGroup,
  getGroupsUserIsAddedTo
} = require("../controllers/groupController");
const router = require("express").Router();

router.post("/createGroup", createGroup);
router.delete("/deleteGroup/:groupId", deleteGroup);
router.delete("/removeMemberFromGroup/:groupId", removeMemberFromGroup);
router.post("/addMemberToGroup/:groupId", addMemberToGroup);
router.get("/getGroupsUserIsAddedTo/:userId", getGroupsUserIsAddedTo);

module.exports = router;

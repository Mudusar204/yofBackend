const Group = require("../models/groupModel"); // Import the Group model

// Controller function to create a new group
const createGroup = async (req, res) => {
  const { name, description, admin, members, groupIcon } = req.body;
console.log(req.body,"chali chali");
  try {
    // Create a new group instance using the Group model
    const newGroup = new Group({
      name,
      description, 
      admin,
      members,
      groupIcon,
    });

    // Save the group to the database
    await newGroup.save();
console.log("group created");
    // Respond with a success message and the created group data
    return res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.log(error.message,"===========error while creating gorup=====");
    // Handle any errors, e.g., validation errors or database errors
    return res
      .status(500)
      .json({ error: "Group creation failed", message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const groupId = req.params.groupId; // Get the group ID from the request parameters
console.log(groupId,"groupId");
  try {
    // Find the group by its ID and delete it
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      // If the group was not found, respond with an error
      return res
        .status(404)
        .json({ message: "Group not found or already deleted" });
    }

    // Respond with a success message and the deleted group data
    return res
      .status(200)
      .json({ message: "Group deleted successfully", group: deletedGroup });
  } catch (error) {
    // Handle any errors, e.g., database errors
    return res
      .status(500)
      .json({ error: "Group deletion failed", message: error.message });
  }
};

const addMemberToGroup = async (req, res) => {
  const groupId = req.params.groupId; // Get the group ID from the request parameters
  const { memberId } = req.body; // Get the member's ID from the request body

  try {
    // Find the group by its ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the member is already in the group
    if (group.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "Member is already in the group" });
    }

    // Add the member to the group's members array
    group.members.push(memberId);

    // Save the updated group to the database
    await group.save();

    // Respond with a success message and the updated group data
    return res
      .status(200)
      .json({ message: "Member added to the group successfully", group });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Adding member to the group failed",
        message: error.message,
      });
  }
};

const removeMemberFromGroup = async (req, res) => {
  const groupId = req.params.groupId; // Get the group ID from the request parameters
  const { memberId } = req.body; // Get the member's ID from the request body

  try {
    // Find the group by its ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the member is not in the group
    if (!group.members.includes(memberId)) {
      return res.status(400).json({ message: "Member is not in the group" });
    }

    // Remove the member from the group's members array
    group.members = group.members.filter(
      (member) => member.toString() !== memberId
    );

    // Save the updated group to the database
    await group.save();

    // Respond with a success message and the updated group data
    return res
      .status(200)
      .json({ message: "Member removed from the group successfully", group });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Removing member from the group failed",
        message: error.message,
      });
  }
};

const getGroupsUserIsAddedTo = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user's ID from the request parameters

   
    // const groups = await Group.find({ members: userId });
    const groups = await Group.find({
      $or: [{ members: userId }, { admin: userId }],
    });
    console.log("=========",groups,' while getting gorups',userId);

    return res.status(200).json({ groups });
  } catch (error) {
    console.log(error.message,'errro while getting gorups');
    return res.status(500).json({ error: 'Failed to retrieve groups', message: error.message });
  }
};
module.exports = {
  createGroup,
  deleteGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  getGroupsUserIsAddedTo
};

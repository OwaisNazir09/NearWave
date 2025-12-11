const Message = require("./chat.model");

const saveMessage = async (data) => {
  const message = await Message.create(data);
  return message;
};

const getMessagesBetween = async (userA, userB) => {
  return Message.find({
    $or: [
      { from: userA, to: userB },
      { from: userB, to: userA },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("from to", "username displayName avatar");
};

module.exports = {
  saveMessage,
  getMessagesBetween,
};

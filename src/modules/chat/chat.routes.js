const router = require("express").Router();
const chatService = require("./chat.service");
const auth = require("../../middlewares/auth.middleware");

router.get("/history/:userId", auth, async (req, res) => {
  try {
    const userA = req.userId;
    const userB = req.params.userId;

    const messages = await chatService.getMessagesBetween(userA, userB);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Failed to load chat history" });
  }
});

module.exports = router;

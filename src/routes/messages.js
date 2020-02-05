import { Router } from "express";

import Message from "../models/message";
import Room from "../models/room";

const router = new Router();

router.post("/", async (req, res) => {
  const { content, room } = req.body;

  const message = new Message();
  message.owner = req.user.id;
  message.content = content;

  // Save and send element to user
  // await Room.updateOne({ _id: room }, { $push: { messages: message } });

  // Emit message
  const data = await Room.findOne({ _id: room }, { users: 1, _id: 0 });
  data.users.map(user => {
    if (user !== req.user.id && req.io.sockets.connected[user])
      req.io.sockets.connected[user].emit("newMessage", {
        room,
        ...message._doc
      });
  });

  res.json({
    data: message
  });
});

export default router;

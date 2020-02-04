import { Router } from "express";

import Message from "../models/message";
import Room from "../models/room";

const router = new Router();

router.post("/", async (req, res) => {
  const { content, room } = req.body;

  const message = new Message();
  message.owner = req.user.id;
  message.content = content;

  const data = await Room.findOne({ _id: room }, { users: 1, _id: 0 });
  data.users.map(user => {
    if (user !== req.user.id) {
      if (req.io.sockets.connected[user]) {
        req.io.sockets.connected[user].emit("newMessage", message);
      }
    }
  });

  // req.io.to(room).emit("newMessage", message);
  // req.io.emit("newMessage", message);

  // const response = await Room.updateOne(
  //   { _id: room },
  //   { $push: { messages: message } }
  // );

  res.json({
    data: message
  });

  // res.json({
  //   data: response ? message : null
  // });
});

export default router;

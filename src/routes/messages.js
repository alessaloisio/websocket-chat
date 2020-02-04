import { Router } from "express";

import Message from "../models/message";
import Room from "../models/room";

const router = new Router();

router.post("/", async (req, res) => {
  const { content, room } = req.body;

  const message = new Message();
  message.owner = req.user.id;
  message.content = content;

  req.io.emit("newMessage", message);

  res.json({
    data: message
  });

  // const response = await Room.updateOne(
  //   { _id: room },
  //   { $push: { messages: message } }
  // );

  // res.json({
  //   data: response ? message : null
  // });
});

export default router;

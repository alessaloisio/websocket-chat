import { Router } from "express";

import Room from "../models/room";

const router = new Router();

router.get("/users/:id", async (req, res) => {
  const dest = parseInt(req.params.id) || null;

  const roomId = dest * req.user.id;
  // console.log(roomId);

  Room.findById(roomId).then(async data => {
    if (!data) {
      const room = new Room();
      room._id = roomId;
      room.users = [req.user.id, dest];
      data = await room.save();
    }

    res.json({
      data
    });
  });
});

router.get("/groups/:id", (req, res) => {
  const dest = req.params.id || null;

  res.json({
    data: "test"
  });
});

export default router;

import { Router } from "express";

import Room from "../models/room";

const router = new Router();

router.get("/users/:id", async (req, res) => {
  const dest = parseInt(req.params.id) || null;

  const roomId = dest * req.user.id;
  // req.io.sockets.connected[req.user.id].join(roomId);

  const findRoom = await Room.findById(roomId);
  if (!findRoom) {
    const room = new Room();
    room._id = roomId;
    room.users = [req.user.id, dest];
    await room.save();
  }

  // Lookup Everything for a specific room
  const response = await Room.aggregate([
    {
      $match: {
        _id: `${roomId}`
      }
    },
    {
      $lookup: {
        from: "users",
        let: { uid: "$users" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $ne: ["$_id", req.user.id] },
                  { $in: ["$_id", "$$uid"] }
                ]
              }
            }
          }
        ],
        as: "users_info"
      }
    }
  ]);

  res.json({
    data: response[0]
  });
});

router.get("/groups/:id", (req, res) => {
  const dest = req.params.id || null;

  res.json({
    data: "test"
  });
});

export default router;

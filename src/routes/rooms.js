import { Router } from "express";

import Room from "../models/room";
import Favourite from "../models/favourite";

const router = new Router();

// Get/Create a room for user and an recipient
router.get("/users/:id", async (req, res) => {
  const dest = parseInt(req.params.id) || null;

  const roomId = dest * req.user.id;

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

// GET info of groups
router.get("/groups/:id", (req, res) => {
  const roomId = req.params.id || null;
  res.json({
    data: "test"
  });
});

// Create group
router.post("/groups/", (req, res) => {
  res.json({
    data: "test"
  });
});

// Set/Remove on favourites
router.get("/favourites/:id", (req, res) => {
  const roomId = req.params.id || null;

  if (roomId)
    Room.find(
      {
        _id: roomId,
        users: { $elemMatch: { $eq: req.user.id } }
      },
      { _id: 1 }
    )
      .then(data => {
        // If room exist and user are on this room
        if (data.length) {
          const fav = new Favourite();
          fav.user = req.user.id;
          fav.room = roomId;

          return fav.save();
        }

        throw new Error("Room not exist.");
      })
      .then(() => {
        res.json({
          room: roomId,
          type: "add"
        });
      })
      .catch(error => {
        Favourite.deleteOne({ room: roomId, user: req.user.id }).then(() => {
          res.json({
            room: roomId,
            type: "delete"
          });
        });
      });
  else
    res.json({
      data: null
    });
});

// Get all infos
router.get("/", async (req, res) => {
  const userRooms = {
    favourites: [],
    peoples: [],
    groups: []
  };

  Room.find({
    users: { $eq: req.user.id }
  }).then(data => {
    res.json({ data });
  });
});

export default router;

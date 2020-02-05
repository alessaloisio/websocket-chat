import { Router } from "express";

import Room from "../models/room";
import Favourite from "../models/favourite";

const router = new Router();

const lookupUsersRoom = userId => ({
  $lookup: {
    from: "users",
    let: { uid: "$users" },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [{ $ne: ["$_id", userId] }, { $in: ["$_id", "$$uid"] }]
          }
        }
      }
    ],
    as: "users_info"
  }
});

// Get/Create a room for user and an recipient
router.get("/search/:id", async (req, res) => {
  const dest = parseInt(req.params.id) || null;

  console.log(dest);

  const roomId = dest * req.user.id;

  const findRoom = await Room.findById(roomId);
  if (!findRoom) {
    const room = new Room();
    room._id = roomId;
    room.users = [req.user.id, dest];
    await room.save();
  }

  // Get users_info of the room
  const response = await Room.aggregate([
    {
      $match: {
        _id: `${roomId}`
      }
    },
    lookupUsersRoom(req.user.id)
  ]);

  // Verify if user put the room on favourite
  const favourite = await Favourite.findOne({
    room: roomId,
    user: req.user.id
  });

  res.json({
    data: { ...response[0], favourite: favourite ? true : false }
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
      .catch(() => {
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

// Get a room
router.get("/:id", (req, res) => {
  const roomId = req.params.id || null;

  if (roomId) {
    // Get favourites
    Room.aggregate([
      {
        $match: {
          _id: `${roomId}`,
          users: { $eq: req.user.id } // if user authorize to see
        }
      },
      lookupUsersRoom(req.user.id)
    ]).then(async data => {
      // Verify if user put the room on favourite
      const favourite = await Favourite.findOne({
        room: roomId,
        user: req.user.id
      });

      res.json({
        ...data[0],
        favourite: !!favourite
      });
    });
  } else
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

  const favourites = await Favourite.find(
    { user: req.user.id },
    { room: 1, _id: 0 }
  );

  Room.aggregate([
    {
      $match: {
        users: { $eq: req.user.id }
      }
    },
    lookupUsersRoom(req.user.id),
    {
      $project: {
        _id: 1,
        users: 1,
        users_info: 1
      }
    }
  ]).then(data => {
    const fav = favourites.map(fav => fav.room);

    data.map(room => {
      // Favourites
      if (fav.includes(room._id)) userRooms.favourites.push(room);
      // Users
      else if (
        parseInt(room._id) === room.users.reduce((acc, curr) => acc * curr)
      )
        userRooms.peoples.push(room);
      //Groups
      else userRooms.groups.push(room);
    });

    res.json({ ...userRooms });
  });
});

export default router;

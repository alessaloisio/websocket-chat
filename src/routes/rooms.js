import { Router } from "express";

import Room from "../models/room";
import Favourite from "../models/favourite";
import User from "../models/user";
import Group from "../models/group";

const router = new Router();

// INFOS ROOM
const getInfoRoom = async (user, room) => {
  const group =
    room._id != parseInt(room._id) ? await Group.findById(room._id) : null;

  const favourite = !!(await Favourite.findOne({
    room: room._id,
    user
  }));

  const users = {};

  if (group) {
    users.users_info = {};
    (
      await User.find({
        _id: room.users
      })
    ).map(user => (users.users_info[user._id] = user));
  } else
    users.users_info = await User.findOne({
      _id: room.users.filter(u => u !== user)
    });

  return { favourite, group, ...users };
};

// Create group
router.post("/groups/", (req, res) => {
  // Create the new document
  const group = new Group();
  group.owner = req.user.id;
  group.info = {};
  group.info.name = req.body.name || null;
  group.info.bio = req.body.bio || null;
  group.info.avatar = req.body.avatar || null;

  group
    .save()
    .then(data => {
      // create a room
      const room = new Room();
      room._id = data._id;
      room.users = [req.user.id];
      return room.save();
    })
    .then(data => {
      data = { ...data._doc, group };
      res.json({
        data
      });
    })
    .catch(error => {
      res.json({
        data: null,
        message: error
      });
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

/**
 * Get/Create a room for user who want to join a room
 * Need to return a room informations for the user
 */
router.get("/search/:id", async (req, res) => {
  let type, roomId;
  let dest = req.params.id || null;

  // detect user or group => Number or ObjectId
  if (dest == parseInt(dest)) {
    type = "user";
    dest = parseInt(dest);
    roomId = dest * req.user.id; // Number
  } else {
    type = "group";
    roomId = dest; // ObjectID
  }

  let room = await Room.findById(roomId, {
    _id: 1,
    users: 1,
    users_info: 1
  });

  // User search an another user and want to create a room to chat with him
  if (!room && type === "user") {
    room = new Room();
    room._id = roomId;
    room.users = [req.user.id, dest];
    await room.save();
  }

  // User want to join a group
  if (room && type === "group") {
    if (!room.users.includes(req.user.id)) {
      room.users.push(req.user.id);
      await room.save();
    }
  }

  if (room) {
    const infos = await getInfoRoom(req.user.id, room);

    res.json({
      data: { ...room._doc, ...infos }
    });
  } else {
    res.json({
      data: null
    });
  }
});

// Get a room
router.get("/:id", async (req, res) => {
  const roomId = req.params.id || null;

  if (roomId) {
    const room = await Room.findOne({
      _id: `${roomId}`,
      users: { $eq: req.user.id }
    });

    if (room) {
      const infos = await getInfoRoom(req.user.id, room);

      return res.json({
        ...room._doc,
        ...infos
      });
    }
  }

  res.json({
    data: null
  });
});

// Get all user rooms
router.get("/", async (req, res) => {
  const userRooms = {
    favourites: {},
    peoples: {},
    groups: {}
  };

  const rooms = await Promise.all(
    (
      await Room.find(
        { users: { $eq: req.user.id } },
        {
          _id: 1,
          users: 1,
          users_info: 1
        }
      )
    ).map(async room => {
      const infos = await getInfoRoom(req.user.id, room);

      return {
        ...room._doc,
        ...infos
      };
    })
  );

  rooms.map(room => {
    if (room.favourite) userRooms.favourites[room._id] = room;
    else if (room.group) userRooms.groups[room._id] = room;
    else userRooms.peoples[room._id] = room;
  });

  res.json({ ...userRooms });
});

export default router;

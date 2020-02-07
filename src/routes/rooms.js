import { Router } from "express";

import Room from "../models/room";
import Favourite from "../models/favourite";
import User from "../models/user";
import Group from "../models/group";

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

  const findRoom = await Room.findById(roomId);

  // User search an another user and want to create a room to chat with him
  if (!findRoom && type === "user") {
    const room = new Room();
    room._id = roomId;
    room.users = [req.user.id, dest];
    await room.save();
  }

  // User want to join a group
  if (findRoom && type === "group") {
    if (!findRoom.users.includes(req.user.id)) {
      findRoom.users.push(req.user.id);
      await findRoom.save();
    }
  }

  /***
   * GET INFOS
   */
  const users_info = await User.find({ _id: findRoom.users });
  // Verify if user put the room on favourite
  const favourite = !!(await Favourite.findOne({
    room: roomId,
    user: req.user.id
  }));

  let group = {};
  if (roomId != parseInt(roomId)) {
    group = await Group.findById(roomId);
  }

  res.json({
    data: { ...findRoom._doc, favourite, users_info, group }
  });
});

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

// Get a room
router.get("/:id", async (req, res) => {
  const roomId = req.params.id || null;

  if (roomId) {
    const room = await Room.findOne({
      _id: `${roomId}`,
      users: { $eq: req.user.id } //
    });

    const users_info = await User.find({ _id: room.users });

    const favourite = !!(await Favourite.findOne({
      room: roomId,
      user: req.user.id
    }));

    const group =
      roomId != parseInt(roomId) ? await Group.findById(roomId) : null;

    res.json({
      ...room._doc,
      users_info,
      favourite,
      group
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

  const favourites = Array.from(
    await Favourite.find({ user: req.user.id }, { room: 1, _id: 0 }),
    ({ room }) => room
  );

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
      const newObj = {
        ...room._doc
      };

      newObj.users_info = await User.find({ _id: room.users });

      if (room._id != parseInt(room._id))
        newObj.group = await Group.findById(room._id);

      return newObj;
    })
  );

  rooms.map(room => {
    if (favourites.includes(room._id)) userRooms.favourites.push(room);
    else if (
      parseInt(room._id) === room.users.reduce((acc, curr) => acc * curr)
    )
      userRooms.peoples.push(room);
    else userRooms.groups.push(room);
  });

  res.json({ ...userRooms });
});

export default router;

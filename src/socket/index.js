import jwt from "jsonwebtoken";
import url from "url";

import User from "../models/user";
import Room from "../models/room";

export default io => {
  // When client connect, generate the socket id with the userId
  io.engine.generateId = req => {
    try {
      const query = url.parse(req.url, true).query;

      if (query.token) {
        const decoded = jwt.verify(query.token, process.env.JWT_SECRET);
        return decoded.userId;
      }

      throw new Error("Error with the query");
    } catch (err) {
      return "ERROR";
    }
  };

  // Socket middleware to give
  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) return next(new Error("Authentication error"));
          socket.userId = decoded.userId;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async client => {
    console.log(`Client ${client.id} connected`);
    await User.updateOne({ _id: client.id }, { status: true });
    emit2Others(client.id, true);

    client.on("disconnect", async () => {
      console.log("Client disconnected");
      await User.updateOne({ _id: client.id }, { status: false });
      emit2Others(client.id, false);
    });
  });

  const emit2Others = async (userId, status) => {
    const rooms = await Room.find({ users: userId }, { _id: 1, users: 1 });
    const peoplesRoom = rooms.filter(room => parseInt(room._id) == room._id);
    peoplesRoom.map(room => {
      const recipientId = room.users.find(element => element !== userId);
      if (io.sockets.connected[recipientId])
        io.sockets.connected[recipientId].emit("userStatus", {
          userId,
          status
        });
    });
  };
};

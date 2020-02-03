import jwt from "jsonwebtoken";
import url from "url";

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

  io.on("connection", client => {
    console.log(`Client ${client.id} connected`);
    client.on("disconnect", () => console.log("Client disconnected"));
  });
};

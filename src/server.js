import http from "http";
import express from "express";
import mongoose from "mongoose";
import socket from "socket.io";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);
const io = socket(server);

// NODE SEND THE FRONT-END
const STATIC_DIR = path.join(__dirname, "../", "client", "build");
app.use(express.static(STATIC_DIR));

// Start the NODE SERVER
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);

  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.info("Connected to MongoDB"))
    .catch(err => console.error(err));
});

// Handler where a client are connected
io.on("connection", client => {
  console.log(`Client ${client.id} connected`);
  client.on("disconnect", () => console.log("Client disconnected"));
});

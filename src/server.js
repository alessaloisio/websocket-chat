import http from "http";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import socket from "socket.io";
import path from "path";

import router from "./routes";
import socketManager from "./socket";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

const server = http.Server(app);
const io = socket(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

// NODE SEND THE FRONT-END
const STATIC_DIR = path.join(__dirname, "../", "client", "build");
app.use(express.static(STATIC_DIR));

// Make io accessible to our router
app.use((req, _, next) => {
  req.io = io;
  next();
});

// Node Router
app.use(router);

// Socket Manager
socketManager(io);

// Start the NODE SERVER
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);

  // Start the MongoDb SERVER
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.info("Connected to MongoDB"))
    .catch(err => console.error(err));
});

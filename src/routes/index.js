import { Router } from "express";
import { join } from "path";

import authenticated from "../middlewares/authenticated";

import Auth from "./auth";
import Users from "./users";
import Groups from "./groups.js";
import Rooms from "./rooms";
import Messages from "./messages";

const router = new Router();

// PUBLIC ROUTE
router.use("/", Auth);

// PRIVATE ROUTE
router.use("/users", authenticated, Users);
router.use("/groups", authenticated, Groups);

router.use("/rooms", authenticated, Rooms);
router.use("/messages", authenticated, Messages);

// Little Hack to always send React App
router.use("*", (_, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

export default router;

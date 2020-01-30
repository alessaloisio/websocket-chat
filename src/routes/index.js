import { Router } from "express";
import { join } from "path";

import authenticated from "../libs/authenticated";

import Auth from "./auth";
import Users from "./users";
import Rooms from "./rooms";
import Messages from "./messages";

const router = new Router();

router.use("/", Auth);
router.use("/users", authenticated, Users);
router.use("/rooms", authenticated, Rooms);
router.use("/messages", authenticated, Messages);

// Little Hack to always send React App
router.use("*", (_, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

export default router;

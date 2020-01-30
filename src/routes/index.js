import { Router } from "express";
import { join } from "path";

import Auth from "./auth";
import Users from "./users";
import Rooms from "./rooms";
import Messages from "./messages";

const router = new Router();

router.use("/", Auth);
router.use("/users", Users);
router.use("/rooms", Rooms);
router.use("/messages", Messages);

// Little Hack to always send React App
router.use("*", (_, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

export default router;

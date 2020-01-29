import { Router } from "express";
import { join } from "path";

import Auth from "./auth";
import Users from "./users";

const router = new Router();

router.use("/", Auth);
router.use("/users", Users);

// Little Hack to always send React App
router.use("*", (_, res) => {
  res.sendFile(join(__dirname, "../../client/build", "index.html"));
});

export default router;

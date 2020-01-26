import { Router } from "express";

import Auth from "./auth";
import Users from "./users";

const router = new Router();

router.use("/", Auth);
router.use("/users", Users);

export default router;

import { Router } from "express";

const router = new Router();

router.use("/", (req, res) => {
  res.json({
    me: "me"
  });
});

export default router;

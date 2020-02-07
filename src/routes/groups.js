import { Router } from "express";

import Group from "./../models/group";

const router = new Router();

router.use("/search/:name", async (req, res) => {
  const name = req.params.name || "";

  const group = await Group.find({
    "info.name": {
      $regex: `.*${name}.*`,
      $options: "i"
    }
  });

  res.json({
    data: group
  });
});

export default router;

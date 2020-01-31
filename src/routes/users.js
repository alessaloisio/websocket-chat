import { Router } from "express";

import User from "./../models/user";

const router = new Router();

router.use("/search/:name", async (req, res) => {
  const name = req.params.name || "";

  const user = await User.find({
    _id: {
      $ne: req.user.id
    },
    "info.name": {
      $regex: `.*${name}.*`,
      $options: "i"
    }
  });

  res.json({
    data: user
  });
});

// https://expressjs.com/fr/guide/routing.html
router.use("/:login", async (req, res) => {
  const login = req.params.login || "";

  const user = await User.findOne({
    login: {
      $eq: login
    }
  });

  res.json({
    data: user
  });
});

router.use("/", async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    data: user
  });
});

export default router;

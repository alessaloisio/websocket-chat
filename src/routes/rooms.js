import { Router } from "express";

const router = new Router();

router.get("/users/:id", (req, res) => {
  const dest = req.params.id || null;

  const roomId = parseInt(dest) * req.user.id;
  console.log(roomId);

  res.json({
    data: "test"
  });
});

router.get("/groups/:id", (req, res) => {
  const dest = req.params.id || null;

  const roomId = parseInt(dest) * req.user.id;

  res.json({
    data: "test"
  });
});

export default router;

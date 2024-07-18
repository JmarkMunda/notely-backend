import express from "express";
const router = express.Router();

router.post("/create", (req, res) => {
  const { title, description, userId } = req.body;
});

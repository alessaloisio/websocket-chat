import { Schema, model } from "mongoose";

const Favourite = new Schema({
  user: { type: Number, required: true },
  room: { type: String, required: true }
});

Favourite.index({ user: 1, room: 1 }, { unique: true });

export default model("Favourite", Favourite);

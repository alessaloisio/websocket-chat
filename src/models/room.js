import { Schema, model } from "mongoose";

const Room = new Schema(
  {
    users: [Number]
  },
  { timestamps: true }
);

export default model("Room", Room);

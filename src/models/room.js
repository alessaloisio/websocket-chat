import { Schema, model } from "mongoose";

import { Message } from "./message";

const Room = new Schema(
  {
    users: [Number],
    messages: [Message]
  },
  { timestamps: true }
);

export default model("Room", Room);

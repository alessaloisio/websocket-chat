import { Schema, model } from "mongoose";

import { Message } from "./message";

const Room = new Schema(
  {
    _id: { type: String },
    users: { type: [Number], required: true },
    messages: [Message],
    files: [String]
  },
  { timestamps: true }
);

export default model("Room", Room);

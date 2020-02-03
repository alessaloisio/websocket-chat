import { Schema } from "mongoose";

export const Message = new Schema(
  {
    owner: Number,
    content: String
  },
  { timestamps: true }
);

export default model("Message", Message);

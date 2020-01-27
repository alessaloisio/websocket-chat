import { Schema } from "mongoose";

const PersonalInfo = new Schema(
  {
    avatar: String,
    name: String,
    bio: { type: String, trim: true },
    links: Object
  },
  { _id: false }
);

export default PersonalInfo;

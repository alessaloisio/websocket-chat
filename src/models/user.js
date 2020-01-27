import { Schema, model } from "mongoose";

import PersonalInfo from "./personalInfo";

const User = new Schema(
  {
    _id: { type: Number },
    email: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    type: { type: String, default: 1 },
    status: { type: Boolean, default: false },
    birthday: Date,
    role: String,
    info: PersonalInfo
  },
  { timestamps: true }
);

export default model("User", User);

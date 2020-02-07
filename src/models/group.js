import { Schema, model } from "mongoose";

import PersonalInfo from "./personalInfo";

const Group = new Schema(
  {
    owner: { type: Number, required: true },
    info: PersonalInfo
  },
  { timestamps: true }
);

Group.index({ owner: 1, "info.name": 1 }, { unique: true });

export default model("Group", Group);

import { Schema, model } from "mongoose";

import PersonalInfo from "./personalInfo";

const Group = new Schema(
  {
    info: PersonalInfo
  },
  { timestamps: true }
);

export default model("Group", Group);

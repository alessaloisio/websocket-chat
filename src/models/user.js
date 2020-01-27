import { Schema } from "mongoose";

const User = new Schema(
  {
    _id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    type: { type: String, default: 1 },
    status: { type: Boolean, default: false },
    birthday: Date,
    role: String
  },
  { timestamps: true }
);

export default User;

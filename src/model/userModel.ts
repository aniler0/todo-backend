import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const UsersModel = mongoose.model("users", userSchema);

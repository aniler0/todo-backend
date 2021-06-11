import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { usePushEach: true }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 10,
      max: 255,
    },
    password: {
      type: String,
      require: true,
      max: 1024,
      min: 6,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tasks: [taskSchema],
  },
  { usePushEach: true }
);

export const User = mongoose.model("users", userSchema);

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const dbURI: any = process.env.DB_CONNECT;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    if (result) return true;
    else {
      return false;
    }
  })
  .catch((err) => console.log(err));

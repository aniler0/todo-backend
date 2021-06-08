import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); //this hides our db uri

export const dbURI: any = process.env.DB_CONNECT; //we assigned hided db uri

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    if (result) return true;
    else {
      return false;
    }
  })
  .catch((err) => console.log(err));

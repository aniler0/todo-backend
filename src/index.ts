import cors from "cors";
import express from "express";
import { dbURI } from "./db";
import authRoute from "./routes/userauth";

//express app
const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/posts", authRoute);

//connect to db and open server
if (dbURI) {
  app.listen(PORT, () =>
    console.log(
      `Server is started on http://localhost:${PORT} and database is working !`
    )
  );
}

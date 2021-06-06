import cors from "cors";
import express from "express";
import { dbURI } from "./db";
import UserRouter from "./routes/userRoutes";

//express app
const app = express();

const PORT = process.env.PORT || 5000;

//connect to db
if (dbURI) {
  app.listen(PORT, () =>
    console.log(
      `Server is started on http://localhost:${PORT} and database is working !`
    )
  );
}
//middlewares
app.use(cors());

app.use("/api/users", UserRouter);

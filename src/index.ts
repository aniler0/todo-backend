import cors from "cors";
import express from "express";
import { dbURI } from "./db";
import router from "./routes/routers";

//express app
const app = express();

const PORT = process.env.PORT || 5000;

//connect to db and open server
if (dbURI) {
  app.listen(PORT, () =>
    console.log(`Server is started and database is working !`)
  );
}

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/tasks", router);

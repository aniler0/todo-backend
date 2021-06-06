import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/tasks";

//express app
const app = express();

const PORT = process.env.PORT || 5000;

//connect to db
const dbuRI =
  "mongodb+srv://aniler:anil2000@cluster0.4wjpp.mongodb.net/todo-app?retryWrites=true&w=majority";
mongoose
  .connect(dbuRI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(PORT, () => {
      console.log("Server is started !");
    })
  )
  .catch((err) => console.log(err));

//middlewares
app.use(cors());

app.use("/api/user", router);

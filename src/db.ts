import mongoose from "mongoose";

export const dbURI =
  "mongodb+srv://aniler:anil2000@cluster0.4wjpp.mongodb.net/todo-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    if (result) return true;
    else {
      return false;
    }
  })
  .catch((err) => console.log(err));

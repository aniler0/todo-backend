import express from "express";
import { UsersModel } from "../model/userModel";

const router = express.Router();

router.get("/", (req, res) => {
  UsersModel.find()
    .then((result: any) => res.send(result))
    .catch((err: any) => console.log(err));
});

router.get("/add", (req, res) => {
  const user = new UsersModel({
    name: "Ali veli",
    password: 2124142,
  });

  user
    .save()
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

export default router;

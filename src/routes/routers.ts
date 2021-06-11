import express from "express";
import {
  getTasks,
  login,
  newTask,
  register,
} from "../controllers/userController";
import { verify } from "./verifyToken";

const router = express.Router();

//user register and login routers
router.post("/register", register);
router.post("/login", login);

//tasks routers
router.get("/", verify, getTasks);
router.post("/newtask", verify, newTask);

export default router;

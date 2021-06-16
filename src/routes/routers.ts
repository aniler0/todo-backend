import express from "express";
import {
  deleteTask,
  getTasks,
  login,
  newTask,
  register,
  updateTask,
} from "../controllers/userController";
import { verify } from "./verifyToken";

const router = express.Router();

//user register and login routers
router.post("/register", register);
router.post("/login", login);

//tasks routers
router.get("/", verify, getTasks);
router.post("/newtask", verify, newTask);
router.put("/:id", verify, updateTask);
router.delete("/:id", verify, deleteTask);

export default router;

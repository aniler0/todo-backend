import express from "express";
import { addUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/add-user", addUser);

export default router;

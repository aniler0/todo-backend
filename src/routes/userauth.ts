import express from "express";
import { getPosts, login, register } from "../controllers/userController";
import { verify } from "./verifyToken";

const router = express.Router();

router.get("/", verify, getPosts);

router.post("/register", register);

router.post("/login", login);

export default router;

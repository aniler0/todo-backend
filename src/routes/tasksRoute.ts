import express from "express";
import { getTasks } from "../controllers/userController";
import { verify } from "./verifyToken";

const router = express.Router();

router.get("/", verify, getTasks);
router.patch("/newtask", verify, getTasks);

export default router;

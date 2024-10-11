import { Router } from "express";
import authController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/signUp", authController.signUp);

export default authRoutes;